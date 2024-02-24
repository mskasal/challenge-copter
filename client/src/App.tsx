import { useRef } from "react";
import { useDraggable, useDropzone } from "./drag-hook";
import { DataType } from "./drag-dom";

type FlightType = "pre" | "now" | "post";

type Flight = { name: string; desc: string; id: number };

const flights: Record<FlightType, Flight[]> = {
  "pre": [
    {
      name: "Urban pre Traffic Analysis",
      id: 0,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      name: "Urban pre Traffic Analysis",
      id: 1,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      name: "Urban pre Traffic Analysis",
      id: 2,
      desc: "Study city traffic patterns for congestion solutions.",
    },
  ],
  now: [
    {
      name: "Urban now Traffic Analysis",
      id: 3,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      name: "Urban now Traffic Analysis",
      id: 4,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      name: "Urban now Traffic Analysis",
      id: 5,
      desc: "Study city traffic patterns for congestion solutions.",
    },
  ],
  post: [
    {
      name: "Urban post Traffic Analysis",
      id: 6,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      name: "Urban post Traffic Analysis",
      id: 7,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      name: "Urban post Traffic Analysis",
      id: 8,
      desc: "Study city traffic patterns for congestion solutions.",
    },
  ],
};

const DraggableElement = ({ data }: any) => {
  const liRef = useRef<HTMLLIElement>(null);
  useDraggable<HTMLLIElement, typeof data>(liRef, data);
  return (
    <li
      draggable="true"
      ref={liRef}
    >
      <h3>{data.name}</h3>
      <i>{data.id}</i>
      <p>{data.desc}</p>
    </li>
  );
};

const DropZoneElement = ({ children }: any) => {
  const ulRef = useRef<HTMLUListElement>(null);

  useDropzone<HTMLUListElement, Flight>(
    ulRef,
    DataType.JSON,
    (data) => {
      console.log(data);
    },
  );

  return (
    <ul ref={ulRef}>
      {children}
    </ul>
  );
};

export const App = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
        padding: "20px",
      }}
    >
      <DropZoneElement>
        {flights.pre.map((flight) => (
          <DraggableElement key={`pre-${flight.id}`} data={flight} />
        ))}
      </DropZoneElement>

      <DropZoneElement>
        {flights.now.map((flight) => (
          <DraggableElement key={`now-${flight.id}`} data={flight} />
        ))}
      </DropZoneElement>

      <DropZoneElement>
        {flights.post.map((flight) => (
          <DraggableElement key={`post-${flight.id}`} data={flight} />
        ))}
      </DropZoneElement>
    </div>
  );
};
