import express from "express";
import {
  createListController,
  loginController,
  registerController,
} from "../Controllers/userController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Welcome to ToDo List App Project`);
});

// POST || New User Registeration
router.post("/register", registerController);

// POST || User Login
router.post("/login", loginController);

// POST || Create New List
router.post("/create-list", createListController);

export default router;
