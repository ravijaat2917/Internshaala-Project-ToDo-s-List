import express from "express";
import {
  createListController,
  getUsercontroller,
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

// POST || Get Single User
router.post('/get-user', getUsercontroller);

export default router;
