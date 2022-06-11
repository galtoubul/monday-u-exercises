import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tasksFile = join(__dirname, "..", "data", "tasks.json");

async function readTasksFile() {
  try {
    const data = await fs.readFile(tasksFile);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeTasksFile(content) {
  try {
    await fs.writeFile(tasksFile, JSON.stringify(content));
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`);
  }
}

function calcTasksLeft(tasks) {
  return !tasks.length
    ? 0
    : tasks.reduce(
        (currTasksLeft, task) =>
          !task.checked ? currTasksLeft + 1 : currTasksLeft,
        0
      );
}

export { readTasksFile, writeTasksFile, calcTasksLeft };
