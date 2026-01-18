const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlware");

const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,} = require("../controllers/userController");

// Public routes

// @route  POST /api/users/register
// @desc   Register new user
router.post("/register", registerUser);

// @route  POST /api/users/login
// @desc   Authenticated user
router.post("/login", loginUser);

// Protected routes

//@route  GET /api/users
//@desc   Get all users
router.get("/", auth, getUsers);

//@route  GET /api/users/id
//@desc   Get  users by id
router.get("/:id", auth, getUserById);

//@route  PUT /api/users/id
//@desc   for update users by id
router.put("/:id", auth, updateUser);

//@route  DELETE /api/users/id
//@desc   for delete users by id
router.delete("/:id", auth, deleteUser);

module.exports = router;
