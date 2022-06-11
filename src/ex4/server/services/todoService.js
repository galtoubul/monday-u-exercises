import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tasksFile = join(__dirname, "..", "data", "tasks.json");
const newTasksFileContent = JSON.stringify({ tasks: [] });

async function getTasks() {
  return await readTasksFile();
}

async function deleteTask(id) {
  const data = await readTasksFile();
  const newData = data.tasks.filter((task) => task.id !== id);
  await writeTasksFile(newData);
}

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

function createTasksFile() {
  const content = newTasksFileContent;
  fs.writeFileSync(tasksFilePath, content);
}

export { getTasks, deleteTask };
