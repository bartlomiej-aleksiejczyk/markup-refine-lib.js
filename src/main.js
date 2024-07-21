import "./app.css";
import App from "./App.svelte";
import Topbar from "./lib/topbar/TopbarContainer.svelte";
const app = new App({
  target: document.getElementById("app"),
});

export default app;
