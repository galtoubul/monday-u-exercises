import express from "express";
import { getTasks, deleteTask } from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/", getTasks);
// todoRouter.post(addTodo);
todoRouter.delete("/:id", deleteTask);

export { todoRouter };
