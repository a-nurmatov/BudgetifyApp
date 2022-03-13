import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Handling GET request to /expenses",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Handling POST request to /expenses",
  });
});

router.get("/:expenseId", (req, res) => {
  let { expenseId } = req.params;
  res.json({
    message: "Handling GET request specific expense with ID",
    id: expenseId,
  });
});

router.patch("/:expenseId", (req, res) => {
  let { expenseId } = req.params;
  res.json({
    message: "Updated expense with ID",
    id: expenseId,
  });
});

router.delete("/:expenseId", (req, res) => {
  let { expenseId } = req.params;
  res.json({
    message: "Deleted expense with ID",
    id: expenseId,
  });
});

export default router;
