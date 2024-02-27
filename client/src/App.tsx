import { FlatButton } from "./components/Buttons";
import Flight from "./components/Flight.component";
import FlightColumn from "./components/FlightColumn.component";
import { DialogType, useDialog } from "./contexts/Dialogs.context";

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
  const { openDialog } = useDialog()

  return (
    <div className="flight-mission-container">
      <div className="flight-mission-header">
        <h3>Flight Mission Control Tool</h3>
        <FlatButton onClick={() => openDialog(DialogType.ADD)} text="Add Mission"/>
      </div>

      <div className="flights-view">
        <FlightColumn status="pre">
          <h4>Pre-Flight ({flights.pre.length})</h4>
          {flights.pre.map((flight) => (
            <Flight
              key={`pre-${flight.id}`}
              flight={{ ...flight, id: flight.id.toString(), status: "pre" }}
            />
          ))}
        </FlightColumn>

        <FlightColumn status="now">
          <h4>Flight ({flights.now.length})</h4>
          {flights.now.map((flight) => (
            <Flight
              key={`now-${flight.id}`}
              flight={{ ...flight, id: flight.id.toString(), status: "now" }}
            />
          ))}
        </FlightColumn>

        <FlightColumn status="post">
          <h4>Post-Flight ({flights.post.length})</h4>
          {flights.post.map((flight) => (
            <Flight
              key={`post-${flight.id}`}
              flight={{ ...flight, id: flight.id.toString(), status: "post" }}
            />
          ))}
        </FlightColumn>
      </div>
    </div>
  );
};
