import express from "express";
import { config } from "dotenv";
import userRoute from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";

export const app = express();
config({
  path: "./data/config.env",
});

/* `app.use(express.json());` is a middleware function that parses incoming requests with JSON
payloads. It basically allows the server to accept JSON data in the request body and parse it into a
JavaScript object that can be easily used in the server-side code. */
app.use(express.json());
app.use(cookieParser());

app.use("/app/v1/users", userRoute);
app.use("/app/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome");
});
