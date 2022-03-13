import { hashSync, compareSync } from "bcrypt";
import express from "express";
import users from "../models/database.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const { sign } = jwt;
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "List of all users",
    users,
  });
});

router.post("/signup", (req, res) => {
  let newUser = {
    id: Math.random(),
    email: req.body.email,
    password: hashSync(req.body.password, 10),
    role: req.body.role,
  };
  users.push(newUser);
  res.json({
    message: "New user added",
    users,
  });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  let user = users.find((user) => user.email === email);
  if (user && compareSync(password, user.password)) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      message: "Loged in successfully",
      user: {
        id: user.id,
        email: user.email,
        token: `Bearer ${token}`,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.patch("/:userId", (req, res) => {
  let { userId } = req.params;
  let exist = false;
  users.forEach((user) => {
    if (user.id == userId) {
      exist = true;
      return {
        id: userId,
        email: req.body.email,
        password: hashSync(req.body.password, 10),
        role: user.role,
      };
    }
    return user;
  });
  if (exist)
    res.json({
      message: `User with ID ${userId} has been updated`,
      users,
    });
  else
    res.json({
      message: `User with ID ${userId} not found`,
    });
});

router.delete("/:userId", (req, res) => {
  let { userId } = req.params;
  res.json({
    message: `User with ID ${userId} has been deleted`,
    users: users.filter((user) => user.id == userId),
  });
});

export default router;
