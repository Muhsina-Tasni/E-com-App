// middleware/adminMiddleware.js
const adminOnly = (req, res, next) => {
  // authMiddleware should have set req.user
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  next();
};

module.exports = adminOnly;
