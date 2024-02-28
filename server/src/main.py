import os
from typing import List
from pickletools import pyset
from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2

api_router = APIRouter(prefix="/api")

app = FastAPI(
    title="volocopter_code_challenge",
    description="""Volocopter Code Challenge API.""",
)

DATABASE_HOST = os.environ.get("DATABASE_HOST")
DATABASE_USER = os.environ.get("DATABASE_USER")
DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")
DATABASE_NAME = os.environ.get("DATABASE_NAME")

class FlightPreview(BaseModel):
    title: str
    status: str
    description: str = None

class Flight(FlightPreview):
    id: int

conn_string = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"
connection = psycopg2.connect(conn_string)
connection.autocommit = True

def execute_query(query, fetch=True):
    cursor = connection.cursor()
    cursor.execute(query)
    if fetch:
        result = cursor.fetchall()
        cursor.close()
        return result if result else None
    else:
        connection.commit()
        cursor.close()

def create_table_if_not_exists():
    query = """
        CREATE TABLE IF NOT EXISTS flights (
            id SERIAL PRIMARY KEY,
            title TEXT,
            status TEXT,
            description TEXT
        );
    """
    execute_query(query, fetch=False)

create_table_if_not_exists()

@api_router.get("/health", include_in_schema=False)
def healthcheck():
    """Check if API is up and running."""
    return {"status": "ok"}

@api_router.get("/flights/", response_model=List[Flight])
def get_all_flights():
    query = """
        SELECT id, title, status, description
        FROM flights;
    """
    results = execute_query(query)
    flights = []
    if results:
        for result in results:
            flights.append(dict(zip(['id', 'title', 'status', 'description'], result)))
    return flights

@api_router.post("/flights/", response_model=Flight)
def create_flight(flight: FlightPreview):
    query = f"""
        INSERT INTO flights (title, status, description)
        VALUES ('{flight.title}', '{flight.status}', '{flight.description}')
        RETURNING id, title, status, description;
    """
    result = execute_query(query)
    if result:
        return dict(zip(['id', 'title', 'status', 'description'], result[0]))
    else:
        raise HTTPException(status_code=404, detail="Flight not found")

@api_router.patch("/flights/{flight_id}/", response_model=Flight)
def update_flight(flight_id: int, flight: Flight):
    if flight.status not in ["pre", "now", "post"]:
        raise HTTPException(status_code=400, detail="Invalid status value. Allowed values: 'pre', 'now', 'post'")
    
    query = f"""
        UPDATE flights
        SET title = '{flight.title}',
            status = '{flight.status}',
            description = '{flight.description}'
        WHERE id = {flight_id}
        RETURNING id, title, status, description;
    """
    result = execute_query(query)
    if result:
        return dict(zip(['id', 'title', 'status', 'description'], result[0]))
    else:
        raise HTTPException(status_code=404, detail="Flight not found")

@api_router.delete("/flights/{flight_id}/", response_model=Flight)
def delete_flight(flight_id: int):
    query = f"""
        DELETE FROM flights
        WHERE id = {flight_id}
        RETURNING id, title, status, description;
    """
    result = execute_query(query)
    if result:
        return dict(zip(['id', 'title', 'status', 'description'], result[0]))
    else:
        raise HTTPException(status_code=404, detail="Flight not found")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST, GET, PATCH, DELETE"],
    allow_headers=["*"],
)

app.include_router(api_router)
