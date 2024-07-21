// This document has mocked data
import jsonData from "./lib/topbar/__tests__/sampleData.json";
import Topbar from "./lib/topbar/TopbarContainer.svelte";
import "./common/global-colors.css";
import "./common/global-properties.css";

console.log("Development build");
document.addEventListener("DOMContentLoaded", () => {
  const topBar = document.querySelector("dynamic-topbar");
  if (topBar) {
    topBar.data = JSON.stringify(jsonData);
  }
});
