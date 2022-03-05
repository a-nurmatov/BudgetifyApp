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

router.get("/:id/reset-password", getUser);

router.delete("/:id/delete", deleteUser);

router.patch("/:id/update", updateUser);

export default router;
