// This document has mocked data
import jsonData from "./lib/topbar/__tests__/sampleData.json";
import Topbar from "./lib/topbar/TopbarContainer.svelte";
import "./common/global-colors.css";
import "./common/global-properties.css";
import { version } from "../package.json";

console.log(
  `Running webcomponent library development instance with version: ${version}`
);
document.addEventListener("DOMContentLoaded", () => {
  const topBar = document.querySelector("dynamic-topbar");
  if (topBar) {
    topBar.data = JSON.stringify(jsonData);
  }
});
