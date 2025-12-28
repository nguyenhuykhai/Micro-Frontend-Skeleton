import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./mfe1.css";
import { MainAppRoutes } from "./router/routes/main-app-routes";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <div id="mfe1-root">
      <BrowserRouter>
        <MainAppRoutes />
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
