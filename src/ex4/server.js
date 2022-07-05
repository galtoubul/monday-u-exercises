import express from "express";
import favicon from "serve-favicon";
import { logger } from "./server/middlewares/logger.js";
import { todoRouter } from "./server/routes/todoRouter.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";

const port = 8000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());
// app.use(logger);

app.use("/todo", todoRouter);

app.listen(port);
