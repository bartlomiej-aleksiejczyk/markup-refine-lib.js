// This document has mocked data
import jsonData from "./lib/topbar/tests/sampleData.json";
import Topbar from "./lib/topbar/Topbar.svelte";
import "./common/global-colors.css";
import "./common/global-properties.css";

document.addEventListener("DOMContentLoaded", () => {
  const topBar = document.querySelector("dynamic-topbar");
  if (topBar) {
    topBar.data = JSON.stringify(jsonData);
  }
});
