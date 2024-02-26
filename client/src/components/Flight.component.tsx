import { useRef } from "react";

import { useDraggable } from "../drag-hook";
import { useFlightDelete } from "../hooks";
import { FlightType } from "../models";

import { IconButton } from "./Buttons";
import { Icons } from "./Icons";

interface FlightProps {
  flight: FlightType;
}

export default function Flight({ flight }: FlightProps) {
  const liRef = useRef<HTMLLIElement>(null);
  useDraggable<HTMLLIElement, FlightType>(liRef, flight);
  const { deleteFlight, loading } = useFlightDelete();

  return (
    <li className={`flight-${flight.status}`} draggable ref={liRef}>
      <div className="flight-header">
        <h3>{flight.title}</h3>
        <IconButton
          icon={Icons.bin}
          onClick={() => deleteFlight(flight.id)}
          disabled={loading}
        >
        </IconButton>
      </div>
      <div className="flight-footer">
        <p>{flight.desc}</p>
      </div>
    </li>
  );
}
