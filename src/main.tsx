import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroApp } from "./HeroApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroApp />
  </StrictMode>
);
