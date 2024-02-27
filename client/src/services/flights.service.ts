import { FlightType, FlightTypePreview } from "../models";
import { del, get, patch, post } from "./http.service";

export async function getFlights() {
  return await get<FlightType[]>("/flights");
}

export async function getFlightById(id: string) {
  return await get<FlightType>("/flight", id);
}

export async function saveFlight(data: FlightTypePreview) {
  return await post<FlightTypePreview>("/flight", data);
}

export async function updateFlightById(data: FlightType, id: string) {
  return await patch<FlightType>("/flight", data, id);
}

export async function removeFlightById(id: string) {
  return await del<FlightType>("/flight", id);
}
