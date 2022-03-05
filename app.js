import express from "express";
import usersRoutes from "./routes/users.js";
import homeRoutes from "./routes/home.js";
import { setUser } from "./controllers/users.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import accountsRoutes from "./routes/accounts.js";
import expenseRoutes from "./routes/expense.js";
import expenseCategoryRoutes from "./routes/expenseCategories.js";
import incomeRoutes from "./routes/income.js";
import statsRoutes from "./routes/stats.js";

const app = express();
const PORT = 5000;

const logger = (req, res, next) => {
  console.log("New request made:");
  console.log(`${req.method} ${req.path}  - ${new Date().toTimeString()}`);
  next();
};

//middleWares
app.use(logger);
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/admin", adminRoutes);
app.use("/accounts", accountsRoutes);
app.use("/expense", expenseRoutes);
app.use("/expense-category", expenseCategoryRoutes);
app.use("/income", incomeRoutes);
app.use("/stats", statsRoutes);

app.listen(PORT, () =>
  console.log(`Server runing on http://localhost:${PORT}`)
);
