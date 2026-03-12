const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");
const authMiddleware = require("../middleware/AuthMiddlware"); 

router.get("/stats", authMiddleware, getAdminStats);

module.exports = router;
