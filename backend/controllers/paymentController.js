const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Order Create karna
exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Paise mein hota hai (100 = 1 Rupee)
      currency: "INR",
      receipt: "receipt_" + Math.random(),
    };

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

// 2. Payment Verify karna (Security)
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Payment SUCCESS: Yahan database mein user ko "Paid" mark karein
    res.status(200).json({ message: "Payment Verified Successfully" });
  } else {
    res.status(400).json({ message: "Invalid Signature" });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // SUCCESS: Database update karein
    await Payment.findOneAndUpdate(
      { razorpay_order_id: razorpay_order_id },
      { 
        razorpay_payment_id, 
        razorpay_signature, 
        status: 'Paid' 
      }
    );
    res.status(200).json({ message: "Payment Successful!" });
  } else {
    res.status(400).json({ message: "Payment Verification Failed!" });
  }
};

exports.getAllPayments = async (req, res) => {
  const payments = await Payment.find().populate('student', 'name email');
  res.json(payments);
};