import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { SidebarProvider } from "./components/ui/sidebar";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>
);
