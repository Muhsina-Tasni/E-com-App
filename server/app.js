
import express from "express";
import cors from "cors";

// routes
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import profile from "./routes/userProfileRoutes.js";
import address from "./routes/userAddressRoutes.js";
import cart from "./routes/cartRouter.js";
import product from "./routes/productRoutes.js";
import orderItems from "./routes/orderItemRoutes.js";
import cartItems from "./routes/cartItemsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profile);
app.use("/api/address", address);
app.use("/api/cart", cart);
app.use("/api/product", product);
app.use("/api/orderitem", orderItems);
app.use("/api/cartitems", cartItems);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

export default app;