import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Handling GET request to /expenseCategories",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Handling POST request to /expenseCategories",
  });
});

router.get("/:expenseCategoryId", (req, res) => {
  let { expenseCategoryId } = req.params;
  res.json({
    message: "Handling GET request specific expenseCategory with ID",
    id: expenseCategoryId,
  });
});

router.patch("/:expenseCategoryId", (req, res) => {
  let { expenseCategoryId } = req.params;
  res.json({
    message: "Updated expenseCategory with ID",
    id: expenseCategoryId,
  });
});

router.delete("/:expenseCategoryId", (req, res) => {
  let { expenseCategoryId } = req.params;
  res.json({
    message: "Deleted expenseCategory with ID",
    id: expenseCategoryId,
  });
});

export default router;
