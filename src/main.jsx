import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./tailwind.css";
import "./styles.css";
import "./illustrated.css";
import "./hero-slides.css";
import "./neumorphic.css";
import "./glyph-portal.css";
import "./cinematic-story.css";
import "./logo-intro.css";
import "./service-pages.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
