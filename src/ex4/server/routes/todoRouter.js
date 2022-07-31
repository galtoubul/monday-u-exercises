import express from "express";
import {
  getTasks,
  deleteTask,
  addTask,
  clearAll,
  checkUncheckTask,
} from "../controllers/todoController.js";
import {
  validateSchema,
  addedTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from "../middlewares/validation.js";

const todoRouter = express.Router();

todoRouter.get("/", getTasks);
todoRouter.post("/", validateSchema(addedTaskSchema), addTask);
todoRouter.delete("/all", clearAll);
todoRouter.delete("/:id", validateSchema(taskIdSchema), deleteTask);
todoRouter.patch("/:id", validateSchema(updateTaskSchema), checkUncheckTask);

export { todoRouter };
