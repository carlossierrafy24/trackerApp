import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoadScript } from "@react-google-maps/api";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
      language="en"
      region="US"
      version="weekly"
    >
      <App />
    </LoadScript>
  </StrictMode>
);
