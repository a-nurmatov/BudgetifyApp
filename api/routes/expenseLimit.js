import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Handling GET request to /limits",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Handling POST request to /limits",
  });
});

router.get("/:limitId", (req, res) => {
  let { limitId } = req.params;
  res.json({
    message: "Handling GET request specific limit with ID",
    id: limitId,
  });
});

router.patch("/:limitId", (req, res) => {
  let { limitId } = req.params;
  res.json({
    message: "Updated limit with ID",
    id: limitId,
  });
});

router.delete("/:limitId", (req, res) => {
  let { limitId } = req.params;
  res.json({
    message: "Deleted limit with ID",
    id: limitId,
  });
});

export default router;
