import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Handling GET request to /accounts",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Handling POST request to /accounts",
  });
});

router.get("/:accountId", (req, res) => {
  let { accountId } = req.params;
  res.json({
    message: "Handling GET request specific account with ID",
    id: accountId,
  });
});

router.patch("/:accountId", (req, res) => {
  let { accountId } = req.params;
  res.json({
    message: "Updated account with ID",
    id: accountId,
  });
});

router.delete("/:accountId", (req, res) => {
  let { accountId } = req.params;
  res.json({
    message: "Deleted account with ID",
    id: accountId,
  });
});

export default router;
