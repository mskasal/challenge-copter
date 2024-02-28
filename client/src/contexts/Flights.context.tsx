import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { MappedFlights } from "../models";
import { useFlightsGet } from "../hooks";

type FlightsContextType = {
  fetchFlights: () => void;
  flights: MappedFlights | null;
};

const FlightsContext = createContext<FlightsContextType | undefined>(undefined);

export function useFlights() {
  const context = useContext(FlightsContext);

  if (!context) {
    throw "Missing Provider: FlightsProvider";
  }
  return context;
}

interface FlightsProviderProps {
  children: ReactNode;
}

const initialValues = new Map();
initialValues.set("pre", []);
initialValues.set("now", []);
initialValues.set("post", []);

enum ActionType {
  FETCH_FLIGHTS_SUCCESS = "FETCH_FLIGHTS_SUCCESS",
}

interface Action {
  type: ActionType;
  payload?: MappedFlights;
}

function flightsReducer(state: MappedFlights, action: Action): MappedFlights {
  switch (action.type) {
    case ActionType.FETCH_FLIGHTS_SUCCESS:
      return action.payload || initialValues;
    default:
      return state;
  }
}

export default function FlightsProvider({ children }: FlightsProviderProps) {
  const [flights, dispatch] = useReducer(flightsReducer, initialValues);
  const { fetchFlights: fetchFlightsApi } = useFlightsGet();

  const fetchFlights = () => {
    fetchFlightsApi({
      onSuccess: (data) => {
        dispatch({ type: ActionType.FETCH_FLIGHTS_SUCCESS, payload: data });
      },
    });
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <FlightsContext.Provider value={{ fetchFlights, flights }}>
      {children}
    </FlightsContext.Provider>
  );
}
