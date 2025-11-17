import express from "express";
import {authenticate} from '../middleware/authMiddleware.js'
import { aiInsights } from "../Controllers/aiInsights.js";

const router = express.Router();

router.get("/", authenticate, aiInsights);

export default router;