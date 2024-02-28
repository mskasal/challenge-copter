import { FlightType, FlightTypePreview } from "../models";
import { del, get, patch, post } from "./http.service";

export async function getFlights() {
  return await get<FlightType[]>("/flights");
}

export async function getFlightById(id: string) {
  return await get<FlightType>("/flights", id);
}

export async function saveFlight(data: FlightTypePreview) {
  return await post<FlightTypePreview>("/flights", data);
}

export async function updateFlightById(data: FlightType, id: string) {
  return await patch<FlightType>("/flights", data, id);
}

export async function removeFlightById(id: string) {
  return await del<FlightType>("/flights", id);
}
