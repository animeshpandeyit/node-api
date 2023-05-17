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

// export const updateUserDetails = async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findById(id);

//   /* Sending a JSON response to the client with a success status of true, a message of "updated", and
//   the updated user object. */
//   res.json({ success: true, message: " updated" });
// };

export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  /* `const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });` is
  updating the user details in the database by finding the user with the given `id` and updating
  their `name` and `email` fields with the values provided in the request body. The `{ new: true }`
  option is used to return the updated user object after the update operation is completed. The
  updated user object is then stored in the `updatedUser` constant. */
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true }
  );
  res.json({
    success: true,
    message: "User updated successfully",
    user: updatedUser,
  });
};

// export const deleteUserDetails = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndDelete(id);
//   await user.remove();
//   res.json({ success: true, message: " deleted" });
// };

export const deleteUserDetails = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, message: "User deleted successfully" });
};
