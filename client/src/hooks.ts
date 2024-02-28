import { useCallback, useState } from "react";

import { FlightStatus, FlightType, FlightTypePreview } from "./models";
import {
  getFlights,
  removeFlightById,
  saveFlight,
  updateFlightById,
} from "./services/flights.service";
import { HttpError } from "./services/http.service";

export function useFlightUpdate() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FlightType | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const updateFlight = useCallback((flightData: FlightType, id: string) => {
    setLoading(true);

    updateFlightById(flightData, id)
      .then(
        (response) => setData(response.data),
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    data,
    error,
    updateFlight,
  };
}

export function useFlightDelete() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FlightType | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const deleteFlight = useCallback((id: string) => {
    setLoading(true);

    removeFlightById(id)
      .then(
        (response) => setData(response.data),
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    data,
    error,
    deleteFlight,
  };
}

export function useFlightAdd() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FlightTypePreview | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const addFlight = useCallback((data: FlightTypePreview) => {
    setLoading(true);

    saveFlight(data)
      .then(
        (response) => setData(response.data),
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    data,
    error,
    addFlight,
  };
}

export function useFlightsGet() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    | MappedFlights
    | null
  >(null);
  const [error, setError] = useState<HttpError | null>(null);

  const fetchFlights = useCallback(() => {
    setLoading(true);

    getFlights()
      .then(
        (response) => {
          const mapped = flightsToMap(response.data);
          setData(mapped);
        },
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    data,
    error,
    fetchFlights,
  };
}

type MappedFlights = Map<FlightStatus, FlightType[]>;

function flightsToMap(flights: FlightType[]): MappedFlights {
  const flightMap = new Map<FlightStatus, FlightType[]>();
  flights.forEach((flight) => {
    if (!flightMap.has(flight.status)) {
      flightMap.set(flight.status, []);
    }
    flightMap.get(flight.status)!.push(flight);
  });
  return flightMap;
}
