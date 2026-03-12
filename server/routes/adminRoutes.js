//adminrouter.js
const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/temp");
const authMiddleware = require("../middleware/AuthMiddlware"); 

router.get("/stats", authMiddleware, getAdminStats);

module.exports = router;
