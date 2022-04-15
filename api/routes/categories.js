import express from "express";
import {
  addNewExpenseCategory,
  addNewIncomeCategory,
  deleteExpenseCategory,
  deleteIncomeCategory,
  getAllCategories,
  updateExpenseCategory,
  updateIncomeCategory,
} from "../controllers/categories.js";

const router = express.Router();

router.get("/:userId", getAllCategories);
router.post("/income", addNewIncomeCategory);
router.post("/expense", addNewExpenseCategory);
router.patch("/income/:categoryId", updateIncomeCategory);
router.patch("/expense/:categoryId", updateExpenseCategory);
router.delete("/income/:categoryId", deleteIncomeCategory);
router.delete("/expense/:categoryId", deleteExpenseCategory);

export default router;
