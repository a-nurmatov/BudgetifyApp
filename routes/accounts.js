import express from "express";

const accountsRoutes = express.Router();

accountsRoutes.get("/", (req, res) => res.send("List of all accounts"));

accountsRoutes.get("/:currency", (req, res) => {
  let currency = req.params.currency;
  res.send(`${currency} account`);
});

accountsRoutes.post("/create-account", (req, res) =>
  res.send(`${req.body.currency} account created`)
);

accountsRoutes.patch("/:currency", (req, res) =>
  res.send(`${req.body.currency} account updated`)
);

accountsRoutes.delete("/:currency", (req, res) =>
  res.send(`${req.params.currency} account deleted`)
);

accountsRoutes.get("/add-account", (req, res) => res.render("userDashboard"));

export default accountsRoutes;
