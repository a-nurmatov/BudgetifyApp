import express from "express";

const incomeRoutes = express.Router();

incomeRoutes.get("/", (req, res) => res.send("Incomes"));

incomeRoutes.get("/income-info/:id", (req, res) =>
  res.send(`income with id# ${req.params.id}`)
);

incomeRoutes.get("/add-income", (req, res) => res.send("Add income page"));

incomeRoutes.post("/add-income", (req, res) =>
  res.send(`${req.body.income} this amount of income created`)
);

incomeRoutes.patch("/update/:id", (req, res) =>
  res.send(`income with id# ${req.body.id} updated`)
);
incomeRoutes.delete("/delete/:id", (req, res) =>
  res.send(`income with id# ${req.params.id} deleted`)
);

export default incomeRoutes;
