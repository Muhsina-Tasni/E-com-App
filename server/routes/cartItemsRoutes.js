


const express = require("express");
const router = express.Router();
const {
  addCartItem,
  getCartItemsByUser,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartItemController");

router.post("/", addCartItem);
router.get("/user/:userId", getCartItemsByUser);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router