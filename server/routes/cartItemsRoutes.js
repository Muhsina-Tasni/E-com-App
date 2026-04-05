


import express from "express"
// import router from express.Router()

import{
  addCartItem,
  getCartItemsByUser,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartItemController.js";

const router = express.Router();

router.post("/", addCartItem);
router.get("/user/:userId", getCartItemsByUser);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

export default router;