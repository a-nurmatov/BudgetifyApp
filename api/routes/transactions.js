import express from "express";
import {
  deleteTransaction,
  getAccountTransactions,
  getExpenseTransactions,
  getIncomeTransactions,
  updateTransaction,
} from "../controllers/transactions.js";

const router = express.Router();

router.get("/:accountId", getAccountTransactions);
router.get("/:accountId/income", getIncomeTransactions);
router.get("/:accountId/expense", getExpenseTransactions);
router.patch("/:transactionId", updateTransaction);
router.delete("/:transactionId", deleteTransaction);

export default router;
