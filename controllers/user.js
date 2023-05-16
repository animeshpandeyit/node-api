import { User } from "../models/user.js";

export const getallUsers = async (req, res) => {
  const users = await User.find({});
  console.log(req.query);
  const keyword = req.query.keyword;
  // console.log(keyword);
  res.json({
    success: true,
    users: users,
  });
};

export const Registration = async (req, res) => {
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
};

export const specialFunc = async (req, res) => {
  res.json({ success: true, message: " Special" });
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ success: true, message: " Person Found successfully", user });
};
