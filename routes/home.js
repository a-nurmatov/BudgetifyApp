import express from "express";

const homeRoutes = express.Router();

homeRoutes.get("/", (req, res) => {
  res.render("home");
});

export default homeRoutes;
