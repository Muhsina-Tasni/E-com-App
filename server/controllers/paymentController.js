const Payment = require("../models/Payment");

exports.createPayment = async (req, res) => {
  try {
    const { order_id, paymentMethod, amount, transactionId } = req.body;

    const payment = await Payment.create({
      order_id,
      paymentMethod,
      amount,
      status: "success",
      paymentDate: new Date(),
      transactionId
    });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
