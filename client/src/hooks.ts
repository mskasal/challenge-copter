import { useCallback, useState } from "react";

import {
  FlightStatus,
  FlightType,
  FlightTypePreview,
  MappedFlights,
} from "./models";

import {
  getFlights,
  removeFlightById,
  saveFlight,
  updateFlightById,
} from "./services/flights.service";

import { HttpError } from "./services/http.service";

type UpdateFlightOptions = { onSuccess?: (data: FlightTypePreview) => void };

export function useFlightUpdate() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FlightType | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const updateFlight = useCallback(
    (flightData: FlightType, id: string, options: UpdateFlightOptions) => {
      setLoading(true);

      updateFlightById(flightData, id)
        .then(
          (response) => {
            setData(response.data);
            options.onSuccess && options.onSuccess(response.data);
          },
        )
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    [],
  );

  return {
    loading,
    data,
    error,
    updateFlight,
  };
}

type RemoveFlightOptions = { onSuccess?: (data: FlightTypePreview) => void };

export function useFlightDelete() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FlightType | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const deleteFlight = useCallback(
    (id: string, options: RemoveFlightOptions) => {
      setLoading(true);

      removeFlightById(id)
        .then(
          (response) => {
            setData(response.data);
            options.onSuccess && options.onSuccess(response.data);
          },
        )
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    [],
  );

  return {
    loading,
    data,
    error,
    deleteFlight,
  };
}

type AddFlightOptions = { onSuccess?: (data: FlightTypePreview) => void };

export function useFlightAdd() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FlightTypePreview | null>(null);
  const [error, setError] = useState<HttpError | null>(null);

  const addFlight = useCallback(
    (data: FlightTypePreview, options: AddFlightOptions) => {
      setLoading(true);

      saveFlight(data)
        .then(
          (response) => {
            setData(response.data);
            options.onSuccess && options.onSuccess(response.data);
          },
        )
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    [],
  );

  return {
    loading,
    data,
    error,
    addFlight,
  };
}

type FetchFlightOptions = { onSuccess?: (data: MappedFlights) => void };

export function useFlightsGet() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    | MappedFlights
    | null
  >(null);
  const [error, setError] = useState<HttpError | null>(null);

  const fetchFlights = useCallback((options: FetchFlightOptions) => {
    setLoading(true);

    getFlights()
      .then(
        (response) => {
          const mapped = flightsToMap(response.data);
          setData(mapped);
          options.onSuccess && options.onSuccess(mapped);
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
