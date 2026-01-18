

const express = require("express");
const router = express.Router();

const {
  createProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
} = require("../controllers/userProfileController");

router.post("/", createProfile);
router.get("/:id", getProfileByUserId);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
