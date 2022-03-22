import express from "express";
import {
  deleteUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
