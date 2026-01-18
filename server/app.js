const express = require("express");
const cors = require("cors");

//routes
const userRoutes = require("./routes/userRoutes")
const categoryRoutes=require("./routes/categoryRoutes")
const orderRoutes=require("./routes/orderRoutes")
const profile=require("./routes/userProfileRoutes")
const address=require("./routes/userAddressRoutes")
const cart=require("./routes/cartRouter")
const product=require("./routes/productRoutes")
const orderItems=require("./routes/orderItemRoutes")
const cartItems=require("./routes/cartItemsRoutes")
// const adminRoutes = require("./routes/adminRoutes");
const adminRoutes = require("./routes/AdminRouter");





const app=express()


app.use(cors())
app.use(express.json());


//routes
app.use("/api/users",userRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/profile",profile)
app.use("/api/address",address)
app.use("/api/cart",cart)
app.use("/api/product",product)
app.use("/api/orderitem",orderItems)
app.use("/api/cartitems",cartItems)





// app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminRoutes);



// export default app;
module.exports = app;

