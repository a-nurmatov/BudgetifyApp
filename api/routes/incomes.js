import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Handling GET request to /incomes",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Handling POST request to /incomes",
  });
});

router.get("/:incomeId", (req, res) => {
  let { incomeId } = req.params;
  res.json({
    message: "Handling GET request specific income with ID",
    id: incomeId,
  });
});

router.patch("/:incomeId", (req, res) => {
  let { incomeId } = req.params;
  res.json({
    message: "Updated income with ID",
    id: incomeId,
  });
});

router.delete("/:incomeId", (req, res) => {
  let { incomeId } = req.params;
  res.json({
    message: "Deleted income with ID",
    id: incomeId,
  });
});

export default router;
