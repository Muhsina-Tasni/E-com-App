

const express = require("express");
const router = express.Router();
const { createCart, getCartByUser } = require("../controllers/cartCotroller");

router.post("/", createCart);
router.get("/user/:userId", getCartByUser);

module.exports = router;
