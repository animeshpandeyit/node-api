import express from "express";
import { User } from "../models/user.js";
const router = express.Router();
import { getallUsers } from "../controllers/user.js";
import { Registration } from "../controllers/user.js";
import { specialFunc } from "../controllers/user.js";
import { getUserDetails } from "../controllers/user.js";
import { updateUserDetails } from "../controllers/user.js";
import { deleteUserDetails } from "../controllers/user.js";

//
router.get("/all", getallUsers);
//
router.post("/create", Registration);
//
router.get("/usersid", async (req, res) => {
  // const { id } = req.body;
  const { id } = req.query;
  // const user = await User.findById(id);
  console.log(req.params);
  res.json({ success: true, message: " Person Found successfully", user });
});

// router.get("/usersid/:id", async (req, res) => {
//   const { id } = req.query;
//   console.log(req.params);
//   res.json({ success: true, message: " Person Found successfully", user: {} });
// });
//
router.get("/usersid/special", specialFunc);
//
router.get("/usersid/:id", getUserDetails);
//
router.put("/usersid/:id", updateUserDetails);
//
router.delete("/usersid/:id", deleteUserDetails);

// router
//   .get("/usersid/:id")
//   .get(getUserDetails)
//   .put(updateUserDetails)
//   .delete(deleteUserDetails);
export default router;
