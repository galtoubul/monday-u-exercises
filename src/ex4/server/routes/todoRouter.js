import express from "express";
import { getTasks, deleteTask, addTask } from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/", getTasks);
todoRouter.post("/", addTask);
todoRouter.delete("/:id", deleteTask);
// todoRouter.update("/:id", deleteTask);

export { todoRouter };
