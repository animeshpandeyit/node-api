import express from "express";
import { config } from "dotenv";
import userRoute from "./routes/user.js";

export const app = express();
config({
  path: "./data/config.env",
});

app.use(express.json());
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});
