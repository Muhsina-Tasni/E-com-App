const mongoose = require("mongoose")

const orderSchema=new mongoose.Schema({
     
  user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Users collection
      required: true,
    },
     shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
   
     orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    }
 } ,{timestamps:true} 
  )

  module.exports = mongoose.model("Order",orderSchema)