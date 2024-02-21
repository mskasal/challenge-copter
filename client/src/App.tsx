import { DragEvent, useCallback, useState } from "react";

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

export const App = () => {
  const [flightss, setFlights] = useState({ ...flights });

  const drag = useCallback(
    function drag(eventName: string, event: DragEvent, id: number) {
      if (eventName == "onDragStart") {
        event.dataTransfer.clearData();
        event.dataTransfer.setData(
          "text/plain",
          `${id}-${event.currentTarget.className}`,
        );
      }
      console.log(
        eventName,
        event.currentTarget.id,
        id,
      );
    },
    [flightss],
  );

  const dragDrop = useCallback(
    function dragDrop(eventName: string, event: DragEvent) {
      const data = event.dataTransfer.getData("text");
      const id = parseInt(data.split("-")[0]);
      const type: FlightType = data.split("-")[1] as FlightType;
      const dropID: FlightType = event.currentTarget.id as FlightType;
      let dragged: Flight = flightss[type].find((i) => i.id === id) as Flight;

      let newOne = [...flightss[dropID], dragged];
      setFlights({
        ...flightss,
        [dropID]: newOne,
        [type]: flightss[type].filter((i) => i.id !== id),
      });
      console.log(
        event,
        eventName,
        data,
      );
    },
    [flightss],
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "10px",
        padding: "20px",
      }}
    >
      <ul
        onDragOver={(event: DragEvent) => event.preventDefault()}
        onDrop={(event: DragEvent) => dragDrop("onDrop", event)}
        id="pre"
      >
        {flightss.pre.map((f) => (
          <li
            className="pre"
            key={`pre-flg-${f.id}`}
            id={`pre-flg-${f.id}`}
            data-id={f.id}
            draggable="true"
            onDragStart={(event: DragEvent) => drag("onDragStart", event, f.id)}
            onDragEnter={(event: DragEvent) => drag("onDragEnter", event, f.id)}
            onDragEnd={(event: DragEvent) => drag("onDragEnd", event, f.id)}
            onDragExit={(event: DragEvent) => drag("onDragExit", event, f.id)}
            onDragLeave={(event: DragEvent) => drag("onDragLeave", event, f.id)}
          >
            <h3>{f.name}</h3>
            <i>{f.id}</i>
            <p>{f.desc}</p>
          </li>
        ))}
      </ul>
      <ul
        onDragOver={(event: DragEvent) => event.preventDefault()}
        onDrop={(event: DragEvent) => dragDrop("onDrop", event)}
        id="now"
      >
        {flightss.now.map((f) => (
          <li
            className="now"
            key={`now-flg-${f.id}`}
            id={`now-flg-${f.id}`}
            data-id={f.id}
            draggable="true"
            onDragStart={(event: DragEvent) => drag("onDragStart", event, f.id)}
            onDragEnter={(event: DragEvent) => drag("onDragEnter", event, f.id)}
            onDragEnd={(event: DragEvent) => drag("onDragEnd", event, f.id)}
            onDragExit={(event: DragEvent) => drag("onDragExit", event, f.id)}
            onDragLeave={(event: DragEvent) => drag("onDragLeave", event, f.id)}
          >
            <h3>{f.name}</h3>
            <i>{f.id}</i>
            <p>{f.desc}</p>
          </li>
        ))}
      </ul>
      <ul
        onDragOver={(event: DragEvent) => event.preventDefault()}
        onDrop={(event: DragEvent) => dragDrop("onDrop", event)}
        id="post"
      >
        {flightss.post.map((f) => (
          <li
            key={`post-flg-${f.id}`}
            id={`post-flg-${f.id}`}
            className="post"
            data-id={f.id}
            draggable="true"
            onDragStart={(event: DragEvent) => drag("onDragStart", event, f.id)}
            onDragEnter={(event: DragEvent) => drag("onDragEnter", event, f.id)}
            onDragEnd={(event: DragEvent) => drag("onDragEnd", event, f.id)}
            onDragExit={(event: DragEvent) => drag("onDragExit", event, f.id)}
            onDragLeave={(event: DragEvent) => drag("onDragLeave", event, f.id)}
          >
            <h3>{f.name}</h3>
            <i>{f.id}</i>
            <p>{f.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
