import express from "express";
import {
  addNewAccount,
  deleteAccount,
  getAccount,
  getUserAccounts,
  updateAccount,
} from "../controllers/accounts.js";

const router = express.Router();

router.get("/", getUserAccounts);
router.post("/", addNewAccount);
router.get("/:accountId", getAccount);
router.patch("/:accountId", updateAccount);
router.delete("/:accountId", deleteAccount);

export default router;
