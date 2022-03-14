import express from "express";
const router = express.Router();

router.get("/total-expenses", (req, res) => {
  res.json({
    message: "Handling GET request to /general-total-expenses",
    numberOfUsers: 22,
  });
});

router.get("/average-saving", (req, res) => {
  res.json({
    message: "Handling GET request to /expenses-by-category",
  });
});

export default router;
