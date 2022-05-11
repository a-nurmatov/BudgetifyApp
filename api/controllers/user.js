import User from "../models/user.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const { sign } = jwt;

export const getAllUsers = async (req, res) => {
  let users = await User.find();
  res.status(200).json({
    message: "List of all users",
    users,
  });
};

export const registerUser = async (req, res, next) => {
  try {
    let newUser = new User(req.body);
    await newUser.save();
    res.json({
      message: "New user added",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  console.log(user);
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
        country: user.country,
        expiresIn: 1000 * 60 * 60,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const updateUser = async (req, res) => {
  let id = req.params.userId;
  let updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.json({
    message: `User has been updated!`,
    updatedUser,
  });
};

export const deleteUser = async (req, res) => {
  let { userId } = req.params;
  let deletedUser = await User.findOneAndRemove({ _id: userId });
  res.json({
    message: `User with ID ${userId} has been deleted`,
    users: await User.find(),
  });
};
