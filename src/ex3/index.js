import fs from "fs";
import { createEmptyTasksList } from "./todoListFuncs.js";
import initProgram from "./nonInteractive.js";
import { tasksFilePath } from "./config.js";

init();

function init() {
  // Create an empty tasks list if the file doesn't exists yet
  const data = fs.readFileSync(tasksFilePath, { flag: "a+" });
  if (!data.length) {
    createEmptyTasksList();
  }

  initProgram();
}
