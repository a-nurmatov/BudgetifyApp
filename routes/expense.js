import express from "express";

const expenseRoutes = express.Router();

expenseRoutes.get("/", (req, res) => res.send("All expenses"));

expenseRoutes.get("/expense-info/:id", (req, res) =>
  res.send(`expense with id# ${req.params.id}`)
);

expenseRoutes.get("/add-expense", (req, res) => res.send("Add expense page"));

expenseRoutes.post("/add-expense", (req, res) =>
  res.send(`${req.body.addedExpense} this amount added to expenses`)
);

expenseRoutes.patch("/update/:id", (req, res) =>
  res.send(`expense with id# ${req.body.id} updated`)
);
expenseRoutes.delete("/delete/:id", (req, res) =>
  res.send(`expense with id# ${req.params.id} deleted`)
);

export default expenseRoutes;
