import express from "express";
import { getTasks, deleteTask, addTask, clearAll } from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/", getTasks);
todoRouter.post("/", addTask);
todoRouter.delete("/all", clearAll);
todoRouter.delete("/:id", deleteTask);
// todoRouter.update("/:id", deleteTask);

export { todoRouter };
