import { FlatButton } from "./components/Buttons";
import Flight from "./components/Flight.component";
import FlightColumn from "./components/FlightColumn.component";
import { DialogType, useDialog } from "./contexts/Dialogs.context";
import { useFlights } from "./contexts/Flights.context";

export const App = () => {
  const { openDialog } = useDialog();
  const { flights } = useFlights();

  return (
    <div className="flight-mission-container">
      <div className="flight-mission-header">
        <h3>Flight Mission Control Tool</h3>
        <FlatButton
          onClick={() => openDialog(DialogType.ADD)}
          text="Add Mission"
        />
      </div>

      <div className="flights-view">
        <FlightColumn status="pre">
          <h4>Pre-Flight ({flights?.get("pre")?.length || 0})</h4>
          {flights?.get("pre")?.map((flight) => (
            <Flight
              key={`pre-${flight.id}`}
              flight={{
                ...flight,
                id: flight.id.toString(),
                status: "pre",
              }}
            />
          ))}
        </FlightColumn>

        <FlightColumn status="now">
          <h4>Flight ({flights?.get("now")?.length || 0})</h4>
          {flights?.get("now")?.map((flight) => (
            <Flight
              key={`now-${flight.id}`}
              flight={{
                ...flight,
                id: flight.id.toString(),
                status: "now",
              }}
            />
          ))}
        </FlightColumn>

        <FlightColumn status="post">
          <h4>Post-Flight ({flights?.get("post")?.length || 0})</h4>
          {flights?.get("post")?.map((flight) => (
            <Flight
              key={`post-${flight.id}`}
              flight={{
                ...flight,
                id: flight.id.toString(),
                status: "post",
              }}
            />
          ))}
        </FlightColumn>
      </div>
    </div>
  );
};
