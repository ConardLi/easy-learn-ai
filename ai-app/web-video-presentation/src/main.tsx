import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles/fonts.css";
import "./styles/base.css";
import "./styles/animations.css";
import "./styles/themes.gen.css";
import "./demos/demos.css";
import "./styles/gallery.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
