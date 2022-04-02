import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";

import userRoutes from "./api/routes/user.js";
import accountRoutes from "./api/routes/accounts.js";
import adminReportRoutes from "./api/routes/adminReports.js";
import userReportRoutes from "./api/routes/userReports.js";
import categoryRoutes from "./api/routes/categories.js";
import transactionRoutes from "./api/routes/transactions.js";

import { auth } from "./api/middlewares/passport.js";
import { adminGuard } from "./api/middlewares/guards.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI,
  () => console.log("MongoDB connected!"),
  (err) => console.log(err)
);

// middleWares
app.use(cors());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post("/api/health-check", (req, res) => {
  return res.send({ message: "Health-check is ok" });
});

// routes
app.use("/users", userRoutes);
app.use("/accounts", auth, accountRoutes);
app.use("/categories", auth, categoryRoutes);
app.use("/transactions", auth, transactionRoutes);
app.use("/admin-reports", auth, adminGuard, adminReportRoutes);
app.use("/user-reports", auth, userReportRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});

export default app;
