import { ReactNode, useRef } from "react";

import { useDropzone } from "../drag-hook";
import { DataType } from "../drag-dom";
import { useFlightUpdate } from "../hooks";
import { FlightStatus, FlightType } from "../models";
import { useFlights } from "../contexts/Flights.context";

interface FlightColumnProps {
  children: ReactNode;
  status: FlightStatus;
}

export default function FlightColumn({ children, status }: FlightColumnProps) {
  const ulRef = useRef<HTMLUListElement>(null);
  const { loading, updateFlight } = useFlightUpdate();
  const { fetchFlights } = useFlights();

  useDropzone<HTMLUListElement, FlightType>(
    ulRef,
    DataType.JSON,
    (data) => {
      if (data.status !== status) {
        updateFlight({ ...data, status }, data.id, {
          onSuccess: () => {
            fetchFlights();
          },
        });
      }
    },
  );

  return (
    <ul
      data-loading={loading}
      className={`flight-column-${status}`}
      ref={ulRef}
    >
      {children}
    </ul>
  );
}
