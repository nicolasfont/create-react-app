#!/usr/bin/env node
import { downloadTemplate } from "giget";
import { replaceInFile } from "replace-in-file";

const appName = process.argv[2] || "react-app";

console.log("Downloading template");

await downloadTemplate("github:nicolasfont/react-app-template", {
  dir: appName,
});

await replaceInFile({
  files: `${appName}/**/*`,
  from: /react-app-template/g,
  to: appName,
});

console.log(`Created ${appName}`);
