import express from "express";
import { registerUSer,loginUser } from "../Controllers/authController.js";

const router = express.Router();

router.post('/signup',registerUSer);
router.post('/login',loginUser);

export default router;