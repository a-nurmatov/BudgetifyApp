import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Handling GET request to /incomeCategories",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Handling POST request to /incomeCategories",
  });
});

router.get("/:incomeCategoryId", (req, res) => {
  let { incomeCategoryId } = req.params;
  res.json({
    message: "Handling GET request specific incomeCategory with ID",
    id: incomeCategoryId,
  });
});

router.patch("/:incomeCategoryId", (req, res) => {
  let { incomeCategoryId } = req.params;
  res.json({
    message: "Updated incomeCategory with ID",
    id: incomeCategoryId,
  });
});

router.delete("/:incomeCategoryId", (req, res) => {
  let { incomeCategoryId } = req.params;
  res.json({
    message: "Deleted incomeCategory with ID",
    id: incomeCategoryId,
  });
});

export default router;
