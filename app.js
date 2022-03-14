import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";

import userRoutes from "./api/routes/user.js";
import accountRoutes from "./api/routes/accounts.js";
import incomeRoutes from "./api/routes/incomes.js";
import expenseRoutes from "./api/routes/expenses.js";
import incomeCategoryRoutes from "./api/routes/incomeCategories.js";
import expenseCategoryRoutes from "./api/routes/expenseCategories.js";
import expenseLimitRoutes from "./api/routes/expenseLimit.js";
import adminReportRoutes from "./api/routes/adminReports.js";
import userReportRoutes from "./api/routes/userReports.js";
import paymentRoutes from "./api/routes/payments.js";
import { auth } from "./api/middlewares/passport.js";
import { adminGuard } from "./api/middlewares/guards.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleWares
app.use(cors());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// routes
app.use("/users", userRoutes);
app.use("/accounts", auth, accountRoutes);
app.use("/incomes", auth, incomeRoutes);
app.use("/expenses", auth, expenseRoutes);
app.use("/income-categories", auth, incomeCategoryRoutes);
app.use("/expense-categories", auth, expenseCategoryRoutes);
app.use("/admin-reports", auth, adminGuard, adminReportRoutes);
app.use("/user-reports", auth, userReportRoutes);
app.use("/limits", auth, expenseLimitRoutes);
app.use("/payments", auth, paymentRoutes);

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
