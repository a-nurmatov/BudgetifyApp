import express from "express";

const statsRoutes = express.Router();

statsRoutes.get("/", (req, res) =>
  res.send("User gets all income and expense stats")
);

statsRoutes.get("/:account", (req, res) =>
  res.send("User gets specific account income and expenses stats")
);

export default statsRoutes;
