import express from "express";
import { config } from "dotenv";
import userRoute from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();
config({
  path: "./data/config.env",
});

/* `app.use(express.json());` is a middleware function that parses incoming requests with JSON
payloads. It basically allows the server to accept JSON data in the request body and parse it into a
JavaScript object that can be easily used in the server-side code. */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use("/app/v1/users", userRoute);
app.use("/app/v1/task", taskRouter);
app.get("/", (req, res) => {
  res.send("Welcome");
});

// app.use
// });
app.use(errorMiddleware);
