import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./components/layouts/app-provider";

const mount = (el: HTMLElement) => {
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
  return root;
};

// For standalone development
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("root");
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
