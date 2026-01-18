const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatus = require("../constants/httpStatus");
const messages = require("../constants/messages");





// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(httpStatus.BAD_REQUEST).json({ message: messages.USER_ALREADY_EXISTS });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashed, role: role || "user" });
    await user.save();

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(httpStatus.CREATED).json({ message: messages.USER_REGISTERED, user: userSafe });
  } catch (err) {
    console.error("Register error:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message || "Registration failed" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(httpStatus.BAD_REQUEST).json({ message: messages.INVALID_CREDENTIALS });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(httpStatus.BAD_REQUEST).json({ message: messages.INVALID_CREDENTIALS });

    // Sign token with flat id field
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(httpStatus.OK).json({ token, user: userSafe });
  } catch (err) {
    console.error("Login error:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};











//@desc    Get all user
//@route   GET /api/users
//@access  Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(httpStatus.OK).json(users);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

//@desc    Get user by id
//@route   POST /api/users/id
//@access  Admin/User
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ message: messages.USER_NOT_FOUND });
    res.status(httpStatus.OK).json(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

//@desc    Update user
//@route   PUT /api/users/id
//@access  Amin/User
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ message: messages.USER_NOT_FOUND });
    res.status(httpStatus.OK).json(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

//@desc    Delete user
//@route   DELETE /api/users/id
//@access  Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ message: messages.USER_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.USER_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser };





