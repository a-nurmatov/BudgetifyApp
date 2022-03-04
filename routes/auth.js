import express from "express";

const authRoutes = express.Router();

authRoutes.get("/", (req, res) => {
  res.render("login");
});

authRoutes.get("/logout", (req, res) => {
  res.redirect("/");
});

export default authRoutes;
