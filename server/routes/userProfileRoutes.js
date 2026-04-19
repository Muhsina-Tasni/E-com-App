

import express from "express";
// import router from  express.Router();

import{ auth} from "../middleware/authMiddleware.js";
import {
  createProfile,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
} from "../controllers/userProfileController.js";

const router = express.Router();

router.post("/", auth, createProfile);
router.get("/:id", auth, getProfileByUserId);
router.put("/:id", auth, updateProfile);
router.delete("/:id", auth, deleteProfile);

export default router;
