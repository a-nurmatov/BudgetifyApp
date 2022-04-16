import express from "express";
import {
  addListOfNewCategories,
  addNewCategory,
  deleteCategory,
  getAllCategories,
  updatedCategory,
} from "../controllers/categories.js";

const router = express.Router();

router.get("/:userId", getAllCategories);
router.post("/multiple", addListOfNewCategories);
router.post("", addNewCategory);
router.patch("/:categoryId", updatedCategory);
router.delete("/:categoryId", deleteCategory);

export default router;
