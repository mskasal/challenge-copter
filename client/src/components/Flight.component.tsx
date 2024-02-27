import { useRef } from "react";

import { useDraggable } from "../drag-hook";
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
    <li className={`flight-card-${flight.status}`} draggable ref={liRef}>
      <div className="header">
        <h5>{flight.title}</h5>
        <IconButton
          icon={Icons.bin}
          onClick={() => openDialog(DialogType.DELETE, flight.id)} 
        >
        </IconButton>
      </div>
      <div className="footer">
        <p>{flight.desc}</p>
      </div>
    </li>
  );
}
