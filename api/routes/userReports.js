import express from "express";
const router = express.Router();

router.get("/total-expenses", (req, res) => {
  res.json({
    message: "Handling GET request to /total-expenses",
  });
});

router.get("/expenses-by-category", (req, res) => {
  res.json({
    message: "Handling GET request to /expenses-by-category",
  });
});

export default router;
