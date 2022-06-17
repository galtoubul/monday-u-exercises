import { storage } from "./storage.js";

async function getTasks() {
  let tasks = await storage.getTasks();
  const tasksLeft = await storage.getTasksLeftNum();
  console.log(tasksLeft);
  return { tasks, tasksLeft };
}

export { getTasks };
