const router = require("express").Router();
const auth = require("../middleware/AuthMiddlware");
const { createPayment } = require("../controllers/paymentController");

router.post("/", auth, createPayment);

module.exports = router;
