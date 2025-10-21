#!/usr/bin/env node
import {
  cancel,
  intro,
  isCancel,
  log,
  outro,
  spinner,
  text,
} from "@clack/prompts";
import { downloadTemplate } from "giget";
import { replaceInFile } from "replace-in-file";

const getAppName = async () => {
  if (process.argv[2]) {
    return process.argv[2];
  }

  const value = await text({
    message: "Enter application name",
    placeholder: "react-app",
    defaultValue: "react-app",
  });

  if (isCancel(value)) {
    cancel("Canceled");
    process.exit(0);
  }

  return String(value);
};

const createReactApp = async () => {
  intro("Creating React application");

  const appName = await getAppName();

  const downloadSpinner = spinner();
  downloadSpinner.start("Downloading template");
  await downloadTemplate("github:nicolasfont/react-app-template", {
    dir: appName,
    force: true,
  });
  downloadSpinner.stop("Downloaded template");

  const prepareSpinner = spinner();
  prepareSpinner.start("Preparing project");
  await replaceInFile({
    files: `${appName}/**/*`,
    from: /react-app-template/g,
    to: appName,
  });
  prepareSpinner.stop("Prepared project");

  outro(`Created ${appName}`);
};

try {
  await createReactApp();
} catch (error) {
  log.error(String(error));
  process.exit(1);
}
