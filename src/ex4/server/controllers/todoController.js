import { getTasks as getTasksService } from "../services/getTasks.js";
import { addTask as addTaskService } from "../services/addTask.js";
import { deleteTask as deleteTaskService } from "../services/deleteTask.js";
import { clearAll as clearAllService } from "../services/deleteTask.js";
import { checkUncheckTask as checkUncheckTaskService } from "../services/updateTask.js";

async function getTasks(req, res) {
  const { tasks } = await getTasksService();
  res.status(200).json({ tasks });
}

async function addTask(req, res) {
  const taskText = req?.body?.data?.text;
  const { addedTasks } = await addTaskService(taskText);
  res.status(200).json({ addedTasks });
}

async function deleteTask(req, res, next) {
  const taskId = Number.parseInt(req?.params?.id);
  try {
    const { tasksDeletedNum } = await deleteTaskService(taskId);
    res.status(200).json({ tasksDeletedNum });
  } catch (err) {
    const error = Error(err);
    error.statusCode = 400;
    next(error);
  }
}

async function clearAll(req, res) {
  await clearAllService();
  res.status(200).send();
}

async function checkUncheckTask(req, res, next) {
  const taskId = Number.parseInt(req?.params?.id);
  const checked = req?.body?.data?.checked;
  try {
    const { doneTime } = await checkUncheckTaskService(taskId, checked);
    res.status(200).json({ doneTime });
  } catch (err) {
    const error = Error(err);
    error.statusCode = 400;
    next(error);
  }
}

export { getTasks, deleteTask, addTask, clearAll, checkUncheckTask };
