import express from "express";

const adminRoutes = express.Router();

adminRoutes.get("/", (res, req) => {
  req.render("adminDashboard");
});

export default adminRoutes;
