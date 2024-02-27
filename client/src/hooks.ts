import { useCallback, useState } from "react";

import { FlightType, FlightTypePreview } from "./models";
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
  const [data, setData] = useState<FlightType[] | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const fetchFlights = useCallback(() => {
    setLoading(true);

    getFlights()
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
    fetchFlights,
  };
}
