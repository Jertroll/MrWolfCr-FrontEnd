import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactModal from "react-modal"; // Importa ReactModal
import "./index.css";
import App from "./App.jsx";

// Configura el elemento raíz para react-modal
ReactModal.setAppElement("#root");

// Renderiza la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);