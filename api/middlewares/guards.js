import users from "../models/database.js";

const adminGuard = (req, res, next) => {
  const user = users.find((user) => user.email == req.user.email);
  if (user && user.role.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

export { adminGuard };
