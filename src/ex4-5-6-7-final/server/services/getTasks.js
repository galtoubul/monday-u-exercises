import { storage } from "./storage.js";

async function getTasks() {
  let tasks = await storage.getTasks();
  return { tasks };
}

export { getTasks };
