import { getTasks as getTasksService } from "../services/getTasks.js";
import { addTask as addTaskService } from "../services/addTask.js";
import { deleteTask as deleteTaskService } from "../services/deleteTask.js";
import { clearAll as clearAllService } from "../services/deleteTask.js";
import { checkUncheckTask as checkUncheckTaskService } from "../services/updateTask.js";

async function getTasks(req, res) {
  const { tasks, tasksLeft } = await getTasksService();
  res.status(200).json({ tasks, tasksLeft });
}

async function addTask(req, res) {
  const taskText = req?.body?.data?.text;
  const { addedTasks, tasksLeft } = await addTaskService(taskText);
  res.status(200).json({ addedTasks, tasksLeft });
}

async function deleteTask(req, res, next) {
  const taskId = Number.parseInt(req?.params?.id);
  try {
    const { deletedTask, tasksLeft } = await deleteTaskService(taskId);
    res.status(200).json({ deletedTask, tasksLeft });
  } catch (err) {
    const error = Error(err);
    error.statusCode = 400;
    next(error);
  }
}

async function clearAll(req, res) {
  const { deletedTasks, tasksLeft } = await clearAllService();
  res.status(200).json({ deletedTasks, tasksLeft });
}

async function checkUncheckTask(req, res, next) {
  const taskId = Number.parseInt(req?.params?.id);
  const checked = req?.body?.data?.checked;
  try {
    const { updatedTask, tasksLeft } = await checkUncheckTaskService(
      taskId,
      checked
    );
    res.status(200).json({ updatedTask, tasksLeft });
  } catch (err) {
    const error = Error(err);
    error.statusCode = 400;
    next(error);
  }
}

export { getTasks, deleteTask, addTask, clearAll, checkUncheckTask };
