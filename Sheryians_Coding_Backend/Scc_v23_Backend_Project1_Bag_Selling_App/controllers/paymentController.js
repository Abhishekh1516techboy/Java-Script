import razorpayInstance from "../utils/razorpay.js";
import crypto from "crypto";
// Create order
export const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Razorpay takes amount in paisa
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed", error: err });
  }
};

// Verify payment
export const paymentVerify = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    req.flash("success", "payment Success!");
    return res.redirect("/carts");
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};
