from typing import List
from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel

api_router = APIRouter(prefix="/api")

class Flight(BaseModel):
    title: str
    status: str
    desc: str
    id: str

@api_router.get("/health", include_in_schema=False)
def healthcheck():
    """Check if API is up and running."""
    return {"status": "ok"}


@api_router.get("/flights", response_model=List[Flight])
async def get_flights():
    return [] 

@api_router.post("/flight", response_model=Flight)
async def add_flight(flight: Flight):
    return flight

@api_router.patch("/flight/{flight_id}", response_model=Flight)
async def update_flight(flight_id: int, flight: Flight):
    return flight

@api_router.delete("/flight/{flight_id}")
async def delete_flight(flight_id: int):
    return {"status": "ok"}

app = FastAPI(
    title="volocopter_code_challenge",
    description="""Volocopter Code Challenge API.""",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
