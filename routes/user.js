import express from "express";
const router = express.Router();
import {
  getallUsers,
  register,
  login,
  getMyProfile,
  logout,
} from "../controllers/user.js";

import { isAuthenticated } from "../middlewares/auth.js";

// import { login } from "../controllers/user.js";
// import { specialFunc } from "../controllers/user.js";
// import { getUserDetails } from "../controllers/user.js";
// import { updateUserDetails } from "../controllers/user.js";
// import { deleteUserDetails } from "../controllers/user.js";

//
router.get("/all", getallUsers);
//
router.post("/create", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);
//
// router.get("/usersid", async (req, res) => {
//   // const { id } = req.body;
//   const { id } = req.query;
//   // const user = await User.findById(id);
//   console.log(req.params);
//   res.json({ success: true, message: " Person Found successfully", user });
// });
// router.get("/usersid/:id", getUserDetails);

// router.get("/usersid/:id", async (req, res) => {
//   const { id } = req.query;
//   console.log(req.params);
//   res.json({ success: true, message: " Person Found successfully", user: {} });
// });
//
// router.get("/usersid/special", specialFunc);
//
//
// router.put("/usersid/:id", updateUserDetails);
//
// router.delete("/usersid/:id", deleteUserDetails);
// router
//   .get("/usersid/:id")
//   .get(getUserDetails)
//   .put(updateUserDetails)
//   .delete(deleteUserDetails);
export default router;
