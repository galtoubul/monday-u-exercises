import express from "express";
import { logger } from "./server/middlewares/logger.js";
import { todoRouter } from "./server/routes/todoRouter.js";
import cors from "cors";

const port = 8000;

const app = express();

app.use(express.json());
app.use(cors());
// app.use(logger);

app.use("/todo", todoRouter);

app.listen(port);
