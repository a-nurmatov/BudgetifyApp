import express from "express";
import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

export default router;
