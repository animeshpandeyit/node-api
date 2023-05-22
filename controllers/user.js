import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

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

// export const Registration = async (req, res) => {
//   //   const users = await User.create({
//   const { name, email, password } = req.body;
//   await User.create({
//     name: name,
//     email: email,
//     password: password,
//   });
//   res.status(201).cookie("tempI", "lol").json({
//     success: true,
//     message: "Registration created successfully",
//   });
// };

// export const login = async (req, res) => {
//   const { name, email, password } = req.body;
//   let user = await User.findOne({ email });
//   if (user) {
//     return res
//       .status(404)
//       .json({ message: "User Already Registered", success: false });
//   }
//   const hashedpassword = await bcrypt.hash(password, 10);
//   await User.create({ name, email, password: hashedpassword });

//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

//   res
//     .status(201)
//     .cookie("token", token, {
//       httpOnly: true,
//       maxAge: 15 * 60 * 1000,
//     })
//     .json({
//       success: true,
//       message: "Registration created successfully",
//     });

// const ismatch = await bcrypt.compare(password, user.password);

// if (!ismatch) {
//   return res.render("login", { email, mismatch: "password mismatch" });
// }
// const token = jwt.sign({ _id: user._id }, "animeshisnawab");
// console.log(token);
// res.cookie("token", userId._id, {
// res.cookie("token", token, {
//   httpOnly: true,
//   expires: new Date(Date.now() + 60 * 1000),
// });
// res.redirect("/");
// };

// export const specialFunc = async (req, res) => {
//   res.json({ success: true, message: " Special" });
// };

// export const getUserDetails = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.json({ success: true, message: " Person Found successfully", user });
// };

// export const updateUserDetails = async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findById(id);

//   /* Sending a JSON response to the client with a success status of true, a message of "updated", and
//   the updated user object. */
//   res.json({ success: true, message: " updated" });
// };

// export const updateUserDetails = async (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;
//   const updatedUser = await User.findByIdAndUpdate(
//     id,
//     { name, email },
//     { new: true }
//   );
//   res.json({
//     success: true,
//     message: "User updated successfully",
//     user: updatedUser,
//   });
// };

// export const deleteUserDetails = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndDelete(id);
//   await user.remove();
//   res.json({ success: true, message: " deleted" });
// };

// export const deleteUserDetails = async (req, res) => {
//   const { id } = req.params;
//   const deletedUser = await User.findByIdAndDelete(id);
//   if (!deletedUser) {
//     return res.status(404).json({ success: false, message: "User not found" });
//   }
//   res.json({ success: true, message: "User deleted successfully" });
// };

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(404)
      .json({ success: false, message: " User Already Exist!!! " });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name: name,
    email: email,
    password: hashedpassword,
  });

  // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // res
  //   .status(201)
  //   .cookie("token", token, {
  //     httpOnly: true,
  //     maxAge: 15 * 60 * 1000,
  //   })
  //   .json({ success: true, message: "User created successfully" });

  sendCookie(user, res, "User created successfully", 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User Doesn't Exist!!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(404)
      .json({ success: false, message: "Email or Password is Invaid..." });
  }
  sendCookie(user, res, `Welcome back ${user.name} `, 200);
};

export const getMyProfile = (req, res) => {
  // const { token } = req.cookies;
  // console.log(token);
  // if (!token) {
  //   res.status(404).json({
  //     success: false,
  //     message: "Login failed, please try again",
  //   });
  // }
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // const user = await User.findById(decoded._id);
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// export const getMyProfile = (req, res) => {
//   res.status(200).json({
//     success: true,
//     user: req.user,
//   });
// };

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: req.user,
    });
};
