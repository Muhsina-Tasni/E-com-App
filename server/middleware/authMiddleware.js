// middleware/authMiddleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const auth = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Support both shapes: { id } or { user: { id } }
//     const userId = decoded.id || (decoded.user && decoded.user.id);
//     if (!userId) return res.status(401).json({ message: "Invalid token payload" });

//     const user = await User.findById(userId).select("-password");
//     if (!user) return res.status(401).json({ message: "User not found" });

//     req.user = user; // attach full user doc (without password)
//     next();
//   } catch (err) {
//     console.error("Auth error:", err);
//     res.status(401).json({ message: "Token invalid" });
//   }
// };

// export default auth;
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token invalid" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};  