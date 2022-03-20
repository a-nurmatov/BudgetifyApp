const adminGuard = (req, res, next) => {
  if (req.user && req.user.role.toLowerCase() === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

export { adminGuard };
