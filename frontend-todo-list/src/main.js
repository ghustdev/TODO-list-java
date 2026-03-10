import "./style.css";
import { loadState } from "./model.js";
import { render } from "./view.js";
import { startAlertSystem } from "./alerts.js";

// Initialize app
loadState();
render();
startAlertSystem();
