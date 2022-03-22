import express from "express";
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categories.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", addNewCategory);
router.patch("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
