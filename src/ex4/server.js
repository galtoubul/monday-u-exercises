// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from "express";
import { todoRouter } from "./server/routes/todoRouter.js";
import cors from "cors";

const port = 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/dist", express.static("dist"));

app.use("/todo", todoRouter);

app.listen(port);
