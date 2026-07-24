
import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/userProfileRoutes.js";
import addressRoutes from "./routes/userAddressRoutes.js";
import cartRoutes from "./routes/cartRouter.js";
import productRoutes from "./routes/productRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";
import cartItemRoutes from "./routes/cartItemsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "E-Commerce API is running successfully"
    });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orderitem", orderItemRoutes);
app.use("/api/cartitems", cartItemRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export default app;