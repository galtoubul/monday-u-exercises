import {
  getTasks as getTasksService,
  deleteTask as deleteTaskService,
} from "../services/todoService.js";

async function getTasks(req, res) {
  const data = await getTasksService();
  res.status(200).json(data ? data : { tasks: [] });
}

async function deleteTask(req, res) {
  const taskId = Number.parseInt(req.params.id);
  if (isNaN(taskId)) {
    const err = new Error("wrong parameters");
    err.statusCode = 400;
    throw err;
  }
  await deleteTaskService(taskId);
  res.status(200);
}

export { getTasks, deleteTask };
