import { useRef } from "react";
import { useDraggable, useDropzone } from "./drag-hook";
import { DataType } from "./drag-dom";
import { removeFlightById } from "./services/flights.service";
import Flight from "./components/Flight.component";
import FlightColumn from "./components/FlightColumn.component";

type FlightType = "pre" | "now" | "post";

type Flight = { title: string; desc: string; id: number };

const flights: Record<FlightType, Flight[]> = {
  "pre": [
    {
      title: "Urban pre Traffic Analysis",
      id: 0,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      title: "Urban pre Traffic Analysis",
      id: 1,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      title: "Urban pre Traffic Analysis",
      id: 2,
      desc: "Study city traffic patterns for congestion solutions.",
    },
  ],
  now: [
    {
      title: "Urban now Traffic Analysis",
      id: 3,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      title: "Urban now Traffic Analysis",
      id: 4,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      title: "Urban now Traffic Analysis",
      id: 5,
      desc: "Study city traffic patterns for congestion solutions.",
    },
  ],
  post: [
    {
      title: "Urban post Traffic Analysis",
      id: 6,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      title: "Urban post Traffic Analysis",
      id: 7,
      desc: "Study city traffic patterns for congestion solutions.",
    },
    {
      title: "Urban post Traffic Analysis",
      id: 8,
      desc: "Study city traffic patterns for congestion solutions.",
    },
  ],
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
      <FlightColumn status="pre">
        {flights.pre.map((flight) => (
          <Flight
            key={`pre-${flight.id}`}
            flight={{ ...flight, id: flight.id.toString(), status: "pre" }}
          />
        ))}
      </FlightColumn>

      <FlightColumn status="now">
        {flights.now.map((flight) => (
          <Flight
            key={`now-${flight.id}`}
            flight={{ ...flight, id: flight.id.toString(), status: "now" }}
          />
        ))}
      </FlightColumn>

      <FlightColumn status="post">
        {flights.post.map((flight) => (
          <Flight
            key={`post-${flight.id}`}
            flight={{ ...flight, id: flight.id.toString(), status: "post" }}
          />
        ))}
      </FlightColumn>
    </div>
  );
};
