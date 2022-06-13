import { getTasks as getTasksService } from "../services/getTasks.js";
import { addTask as addTaskService } from "../services/addTask.js";
import { deleteTask as deleteTaskService } from "../services/deleteTask.js";
import { clearAll as clearAllService } from "../services/clearAll.js";

async function getTasks(req, res) {
  const { tasks, tasksLeft } = await getTasksService();
  res.status(200).json({ tasks, tasksLeft });
}

async function addTask(req, res) {
  const taskText = req.body.data.text;
  const { addedTasks, tasksLeft } = await addTaskService(taskText);
  res.status(200).json({ addedTasks, tasksLeft });
}

async function deleteTask(req, res) {
  const taskId = Number.parseInt(req.params.id);
  const { deletedTask, tasksLeft } = await deleteTaskService(taskId);
  res.status(200).json({ deletedTask, tasksLeft });
}

async function clearAll(req, res) {
  const taskId = Number.parseInt(req.params.id);
  const { deletedTasks, tasksLeft } = await clearAllService(taskId);
  res.status(200).json({ deletedTasks, tasksLeft });
}

export { getTasks, deleteTask, addTask, clearAll };
