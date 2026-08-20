

import express from "express";
// import router from express.Router()
import { createCart, getCartByUser,clearCart } from  "../controllers/cartCotroller.js";
const router = express.Router();

router.post("/", createCart);
router.delete("/carts/clear",clearCart);
router.get("/user/:userId", getCartByUser);


export default router;
