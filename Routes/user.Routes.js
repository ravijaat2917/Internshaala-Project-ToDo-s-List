import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Welcome to ToDo List App Project`);
});

export default router;
