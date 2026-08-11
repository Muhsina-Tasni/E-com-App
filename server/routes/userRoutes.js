
import  express from "express"
// import  router from  express.Router();
import {auth} from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,} from "../controllers/userController.js"

console.log("USER ROUTES LOADED");

  const router = express.Router();
// Public routes

// @route  POST /api/users/register
// @desc   Register new user
router.post("/register", registerUser);

// @route  POST /api/users/login
// @desc   Authenticated user
router.post("/login", loginUser);


router.get("/test", (req, res) => {
  res.json({ message: "User routes working" });
});
router.get("/hello", (req, res) => {
  res.json({
    message: "Hello      hello from new deployment"
  });
});













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

export default router;
