import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./pages/app";
import { Waitlist } from "./pages/waitlist";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="waitlist" element={<Waitlist />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
