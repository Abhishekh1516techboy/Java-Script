import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectToDb from "@/lib/dbConnect";

export const POST = async (req) => {

    await connectToDb(); // MongoDB Connect 

    let body = await req.formData(); //  Parse the request body to JSON
    body = Object.fromEntries(body); // Convert FormData to JSON

    // Fetch the payment data from the database
    let payment = await Payment.findOne({ orderID: body.razorpay_order_id }); // Find the payment by orderID
    if (!payment) { // Payment not found
        // Return error if orderID is not found
        return NextResponse.json({ success: false, message: "OrderId Not Found" }); // Return error if orderID is not found
    }

    // Fetch the razorpay_Key_secret of the user who is getting  the payment
    let rzp = await User?.findOne({ userName: payment.to_User }) // Fetch the user details by username

    // Verify the payment signature
    let isValid = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, rzp.razorpaySecret);

    if (isValid) { // Payment verification successful
        // Update the payment status in the database
        const updatedPayment = await Payment.findOneAndUpdate({ orderID: body.razorpay_order_id }, { done: true }, { new: true });
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_User}?paymentdone=true&orderid=${updatedPayment.orderID}&Date=${updatedPayment.createdAt}`);
    }
    else { // Payment verification failed
        // Return error if payment verification fails
        return NextResponse.json({ success: false, message: "Payment verification Failed" }); // Return error if payment verification fails
    }
}

