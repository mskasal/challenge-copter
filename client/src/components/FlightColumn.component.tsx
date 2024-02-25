import { ReactNode, useRef } from "react";

import { useDropzone } from "../drag-hook";
import { DataType } from "../drag-dom";
import { FlightStatus, FlightType } from "../models";

interface FlightColumnProps {
  children: ReactNode;
  status: FlightStatus;
}

export default function FlightColumn({ children, status }: FlightColumnProps) {
  const ulRef = useRef<HTMLUListElement>(null);

  useDropzone<HTMLUListElement, FlightType>(
    ulRef,
    DataType.JSON,
    (data) => {
      if (data.status !== status) {
        console.log(`change: ${data.status} => ${status}`);
      }
    },
  );

  return <ul className={`flight-column-${status}`} ref={ulRef}>{children}</ul>;
}
