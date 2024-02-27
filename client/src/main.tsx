import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import DialogProvider from "./contexts/Dialogs.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
);
