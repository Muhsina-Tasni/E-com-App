

import express from "express";
// import router from express.Router()
import { createCart, getCartByUser } from  "../controllers/cartCotroller.js";
const router = express.Router();

router.post("/", createCart);
router.get("/user/:userId", getCartByUser);

export default router;
