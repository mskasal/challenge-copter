import { del, get, patch, post } from "./http.service";

interface FlightData {
  id: string;
  title: string;
  description: string;
  status: string;
}

export async function getFlights() {
  return await get<FlightData>("/flights");
}

export async function getFlightById(id: string) {
  return await get<FlightData>("/flights", id);
}

export async function saveFlight(data: FlightData) {
  return await post<FlightData>("/flights", data);
}

export async function updateFlightById(data: FlightData, id: string) {
  return await patch<FlightData>("/flights", data, id);
}

export async function removeFlightById(id: string) {
  return await del<FlightData>("/flights", id);
}
