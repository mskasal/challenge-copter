import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";
import DialogProvider from "./contexts/Dialogs.context.tsx";
import "./styles.css";
import FlightsProvider from "./contexts/Flights.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FlightsProvider>
      <DialogProvider>
        <App />
      </DialogProvider>
    </FlightsProvider>
  </React.StrictMode>,
);
