import { useRef } from "react";

import { FlightType } from "../models";
import { useDraggable } from "../drag-hook";

import { IconButton } from "./Buttons";
import { Icons } from "./Icons";

interface FlightProps {
  flight: FlightType;
}

export default function Flight({ flight }: FlightProps) {
  const liRef = useRef<HTMLLIElement>(null);
  useDraggable<HTMLLIElement, FlightType>(liRef, flight);

  return (
    <li className={`flight-${flight.status}`} draggable ref={liRef}>
      <div className="flight-header">
        <h3>{flight.title}</h3>
        <IconButton icon={Icons.bin}></IconButton>
      </div>
      <div className="flight-footer">
        <p>{flight.desc}</p>
      </div>
    </li>
  );
}
