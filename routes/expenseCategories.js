import express from "express";

const expenseCategoryRoutes = express.Router();

expenseCategoryRoutes.get("/", (req, res) => res.send("All categories"));
expenseCategoryRoutes.get("/:id", (req, res) =>
  res.send(`category with id# ${req.params.id}`)
);

expenseCategoryRoutes.post("/add-category", (req, res) =>
  res.send(`${req.body.categoryName} category added to categories`)
);

expenseCategoryRoutes.patch("/update/:id", (req, res) =>
  res.send(`category with id# ${req.params.id} updated`)
);
expenseCategoryRoutes.delete("/delete/:id", (req, res) =>
  res.send(`category with id# ${req.params.id} deleted`)
);

export default expenseCategoryRoutes;
