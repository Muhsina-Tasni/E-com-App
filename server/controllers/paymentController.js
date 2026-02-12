// const Payment = require("../models/Payment");

// exports.createPayment = async (req, res) => {
//   try {
//     const { order_id, paymentMethod, amount, transactionId } = req.body;

//  // simple validation
//     if (!order_id || !paymentMethod || !amount || !transactionId) {
//       return res.status(400).json({ message: "All fields are required" });
//     }



//     const payment = await Payment.create({
//       order_id,
//       paymentMethod,
//       amount,
//       status: "success",
//       paymentDate: new Date(),
//       transactionId
//     });

//     res.json(payment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
  try {
    const { order_id, paymentMethod, amount, transactionId } = req.body;

    // simple validation
    if (!order_id || !paymentMethod || !amount || !transactionId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const payment = await Payment.create({
      order_id,
      paymentMethod,
      amount,
      status: "success",   // must match schema enum
      paymentDate: new Date(),
      transactionId,
    });

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });

  } catch (err) {
    console.error("Payment Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};


module.exports = {createPayment}