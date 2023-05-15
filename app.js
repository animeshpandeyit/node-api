import express from "express";

import mongoose from "mongoose";

const app = express();

/* `app.use(express.json());` is a middleware function in Express that parses incoming requests with
JSON payloads and makes the data available on the `req.body` property. It allows the server to
handle JSON data sent in the request body of a POST or PUT request. */
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://animeshpandeyit:Animesh123@cluster0.nvlem2q.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "backendapi" }
  )
  .then(() => {
    console.log("connection established");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.get("/", (req, res) => {
  res.send("Welcome");
});
//
// const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", schema, "apidata");

//
app.get("/users/all", async (req, res) => {
  const users = await User.find({});
  console.log(req.query);
  const keyword = req.query.keyword;
  // console.log(keyword);

  res.json({
    success: true,
    users: users,
  });
});
//

app.post("/users/create", async (req, res) => {
  //   const users = await User.create({

  const { name, email, password } = req.body;

  await User.create({
    name: name,
    email: email,
    password: password,
  });

  res.status(201).cookie("tempI", "lol").json({
    success: true,
    message: "Registration created successfully",
  });
  //   console.log(users);
});

//

app.get("/usersid", async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  res.json({ success: true, message: " Person Found successfully", user });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is Running...", PORT);
});
