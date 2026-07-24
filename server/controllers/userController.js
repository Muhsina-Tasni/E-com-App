import User from "../models/User.js";
// import sendEmail from "../utils/sendEmail.js"
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "../constants/httpStatus.js";
import messages from "../constants/messages.js";

console.log("🔥 authController file loaded");


// Register
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(httpStatus.BAD_REQUEST).json({ message: messages.USER_ALREADY_EXISTS });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const user = new User({ name, email, password: hashed, role: role || "user" });
//     await user.save();

//     const userSafe = user.toObject();
//     delete userSafe.password;

//     res.status(httpStatus.CREATED).json({ message: messages.USER_REGISTERED, user: userSafe });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message || "Registration failed" });
//   }
// };



//  Register
 export const registerUser = async (req, res) => {
  try {

      console.log("📌 Register API hit");   // ✅ HERE
    const { name, email, password, role } = req.body;


console.log("📌 Sending email to:", email); // ✅ HERE

    // 🔍 Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: messages.USER_ALREADY_EXISTS });
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // 👤 Create user
    const user = new User({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    await user.save();
console.log("✅ User saved");
    // 📧 Send welcome email
console.log("➡ Before sendEmail");

    await sendEmail({
      to: email,
      subject: "Welcome to PAGETURNER🎉",
      html: `
        <h2>Hello ${name},</h2>
        <p>Welcome to <b>My App</b>!</p>
        <p>Your account has been successfully created.</p>
        <p>You can now login and start shopping 🛒</p>
        <br/>
        <p>Thanks,<br/>PAGETURNER Team</p>
      `,
    });

console.log("✅ After sendEmail");


    // 🔒 Remove password from response
    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(httpStatus.CREATED).json({
      message: messages.USER_REGISTERED,
      user: userSafe,
    });
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message || "Registration failed" });
  }
};



// export const registerUser = async (req, res) => {
//   try {
//     console.log("Register API hit");

//     return res.status(201).json({
//       message: "Test response",
//     });
//   } catch (err) {
//     console.error(err);
//   }
// // };

// Login



export const loginUser = async (req, res) => {
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
export const getUsers = async (req, res) => {
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
export const getUserById = async (req, res) => {
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
export const updateUser = async (req, res) => {
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
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ message: messages.USER_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.USER_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// export default { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser };





