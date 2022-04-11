import express from "express";
import {
  addNewAccount,
  deleteAccount,
  getAccount,
  getUserAccounts,
  updateAccount,
} from "../controllers/accounts.js";

const router = express.Router();

router.post("/", addNewAccount);
router.get("/:userId", getUserAccounts);
router.get("/:accountId", getAccount);
router.patch("/:accountId", updateAccount);
router.delete("/:accountId", deleteAccount);

export default router;
