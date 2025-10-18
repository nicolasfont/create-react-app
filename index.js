#!/usr/bin/env node
import { downloadTemplate } from "giget";

console.log("Creating React App");

const { source, dir } = await downloadTemplate("github:nicolasfont/react-app-template");

console.log(`Created app from ${source} located at ${dir}`);
