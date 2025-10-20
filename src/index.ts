#!/usr/bin/env node
import { downloadTemplate } from "giget";

const appName = process.argv[2] || "react-app";

console.log("Downloading template");

await downloadTemplate("github:nicolasfont/react-app-template", {
  dir: appName,
});

console.log(`Created ${appName}`);
