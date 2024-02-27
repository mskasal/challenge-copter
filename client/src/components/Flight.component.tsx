import { useRef } from "react";

import { useDraggable } from "../drag-hook";
import { useFlightDelete } from "../hooks";
import { FlightType } from "../models";

import { IconButton } from "./Buttons";
import { Icons } from "./Icons";
import { DialogType, useDialog } from "../contexts/Dialogs.context";

interface FlightProps {
  flight: FlightType;
}

export default function Flight({ flight }: FlightProps) {
  const liRef = useRef<HTMLLIElement>(null);
  const {openDialog} = useDialog();

  useDraggable<HTMLLIElement, FlightType>(liRef, flight);

  return (
    <li className={`flight-${flight.status}`} draggable ref={liRef}>
      <div className="flight-header">
        <h3>{flight.title}</h3>
        <IconButton
          icon={Icons.bin}
          onClick={() => openDialog(DialogType.DELETE, flight.id)} 
        >
        </IconButton>
      </div>
      <div className="flight-footer">
        <p>{flight.desc}</p>
      </div>
    </li>
  );
}
