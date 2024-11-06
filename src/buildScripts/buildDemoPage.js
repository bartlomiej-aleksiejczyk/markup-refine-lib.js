import { promises as fs } from "fs";
import path from "path";
import { execSync } from "child_process";

const DIST_DIR = path.resolve("dist");

execSync("vite build", { stdio: "inherit" });

const generateIndexHtml = async () => {
  const files = await fs.readdir(DIST_DIR);
  const scriptFiles = files.filter((file) => file.endsWith(".js"));
  const cssFiles = files.filter((file) => file.endsWith(".css"));

  if (scriptFiles.length === 0) {
    throw new Error("No script files found in dist directory.");
  }

  const mainScript = scriptFiles[0];

  const cssLinks = cssFiles
    .map((cssFile) => `<link rel="stylesheet" href="./${cssFile}">`)
    .join("\n  ");

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demo Page</title>
  ${cssLinks}
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./${mainScript}"></script>
</body>
</html>`;

  await fs.writeFile(path.join(DIST_DIR, "index.html"), htmlContent);
  console.log("index.html created successfully with CSS included!");
};

generateIndexHtml().catch((error) => {
  console.error("Error creating index.html:", error);
  process.exit(1);
});
