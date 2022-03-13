import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Handling GET request to /payments",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Handling POST request to /payments",
  });
});

router.get("/:paymentId", (req, res) => {
  let { paymentId } = req.params;
  res.json({
    message: "Handling GET request specific payment with ID",
    id: paymentId,
  });
});

router.patch("/:paymentId", (req, res) => {
  let { paymentId } = req.params;
  res.json({
    message: "Updated payment with ID",
    id: paymentId,
  });
});

router.delete("/:paymentId", (req, res) => {
  let { paymentId } = req.params;
  res.json({
    message: "Deleted payment with ID",
    id: paymentId,
  });
});

export default router;
