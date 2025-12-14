import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res.json({ message: "Register API working" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login API working" });
});

export default router;
