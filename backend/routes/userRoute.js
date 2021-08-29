import express from "express";
import User from "../models/userModel.js";

// import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));

  res.send(users);
});

export default router;
