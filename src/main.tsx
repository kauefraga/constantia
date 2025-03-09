import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./main.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import { App } from "./pages/app";
import { NewHabit } from "./pages/new-habit";
import { NotFound } from "./pages/not-found";
import { Tracker } from "./pages/tracker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="new" element={<NewHabit />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </StrictMode>
);
