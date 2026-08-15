import express from "express";
import { recommendBooks } from "../controllers/aiController.js";

const router = express.Router();

router.post("/recommend", recommendBooks);

export default router;