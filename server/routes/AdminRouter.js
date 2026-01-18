const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/AdminController");
const authMiddleware = require("../middleware/authMiddlware"); // your JWT middleware

router.get("/stats", authMiddleware, getAdminStats);

module.exports = router;
