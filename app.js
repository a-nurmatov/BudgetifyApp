import express from "express";
import usersRoutes from "./routes/users.js";
import homeRoutes from "./routes/home.js";
import { setUser } from "./controllers/users.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

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

app.listen(PORT, () =>
  console.log(`Server runing on http://localhost:${PORT}`)
);
