import { storage } from "./storage.js";

async function checkUncheckTask(id, checked) {
  const updatedTasksNum = await storage.updateTask(id, { checked });
  if (!updatedTasksNum) {
    throw new Error("The task id is not a task id of an existing task");
  }
  const tasksLeft = await storage.getTasksLeftNum();
  return { tasksLeft };
}

export { checkUncheckTask };
