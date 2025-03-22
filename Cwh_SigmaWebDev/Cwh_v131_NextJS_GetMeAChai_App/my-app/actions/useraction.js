"use server"

import Razorpay from "razorpay"
import User from "@/models/User";
import Payment from "@/models/Payment"
import connectToDb from "@/lib/dbConnect";

export const initiate = async (amount, to_username, paymentform, session) => {
    try {
        // Check if the required parameters are missing
        if (!amount || !to_username || !paymentform || !paymentform.name || !paymentform.message) {
            throw new Error("Missing required parameters");
        }

        await connectToDb(); // MongoDB Connect

        // fetch the razorpay_Key_secret of the user who is getting  the payment
        let rzp = await User?.findOne({ userName: to_username }).select("razorpayId razorpaySecret"); // Optimize query, only fetch necessary fields

        if (!rzp.razorpayId || !rzp.razorpaySecret) {
            // Return Message if Razorpay credentials are not found
            return {
                success: false,
                message: "User Not Able To Accept Payment",
            };
        }

        // Create Razorpay instance
        const instance = new Razorpay({
            key_id: rzp.razorpayId,
            key_secret: rzp.razorpaySecret
        });

        // Create order options
        const options = {
            amount: Number.parseInt(amount) * 100, // Convert amount to paise
            currency: "INR", // Currency
        };

        // Create order
        const order = await instance.orders.create(options); // Create a new order

        // Save payment details to MongoDB (do NOT include API credentials)
        await Payment.create({ // Create a new payment object
            orderID: order.id,
            amount: amount,
            to_User: to_username,
            from_User: session?.user?.userName, // Corrected to set from_User from session
            name: paymentform.name, // Corrected to set name from paymentform
            profilePic: session?.user?.image, // Corrected to set profileImg from session
            message: paymentform.message,
        });

        // Only return order details, never API credentials
        return { orderID: order.id, amount: order.amount, currency: order.currency };

    } catch (error) {
        return {
            success: false,
            message: "Error in initiate function",
        };
    }
}

// Fetch User information from the Database
export const fetchUser = async (username) => {
    try {
        await connectToDb(); // Connect to MongoDB

        // Fetch user, excluding sensitive fields
        const user = await User.findOne({ userName: username }).select("-provider") // Exclude sensitive fields

        if (!user) {
            return { success: false, message: "User not found" };
        }

        return user?.toObject({ flattenObjectIds: true });

    } catch (error) {
        console.error("Error in fetchUser function:", error.message);
        return {
            success: false,
            message: error.message || "An error occurred while fetching user data"
        };
    }
};


// Fetch the payments data from the database
export const fetchPayments = async (username) => {
    try {
        await connectToDb(); // MongoDB Connect

        // Fetch the payments data from the database
        let payment = await Payment?.find({ to_User: username, done: true }).sort({ amount: -1 }).select("-name -to_User -orderID -done"); // Find the payments by to_User and done status is true
        return payment?.map(p => p?.toObject({ flattenObjectIds: true })); // Convert to plain objects
    } catch (error) {
        console.error("Error in fetchPayments function:", error.message);
        throw error; // Re-throw the error for further handling
    }
}


// Update the user data in the database
export const updateProfile = async (data, oldusername) => {
    try {
        await connectToDb(); // Connect to MongoDB

        // Convert data to a plain object
        let ndata;
        // Ensure data is correctly converted
        if (data instanceof FormData) {
            ndata = Object.fromEntries(data.entries()); // Convert FormData to an object
        } else if (typeof data === "object") {
            ndata = data; // Use the object directly
        } else {
            return { error: "Invalid data format" };
        }


        // Validate the new userName (e.g., ensure it's at least 4 characters long)
        if (
            !ndata.userName ||                           // Check if userName is falsy (undefined, null, empty)
            ndata.userName.trim().length < 4 ||          // Check length after removing leading/trailing spaces
            ndata.userName !== ndata.userName.trim() ||  // Check for leading/trailing spaces
            ndata.userName.includes(" ")                 // Check for internal spaces
        ) {
            return {
                success: false,
                message: "UserName at least 4 character long",
            };
        }

        // Valid website link prefixes
        const validPrefixes = [
            "https://images.unsplash.com",
            "https://plus.unsplash.com",
            "https://lh3.googleusercontent.com",
            "https://avatars.githubusercontent.com",
            "https://images.pexels.com",
            "https://c10.patreonusercontent.com"
        ];

        // Check if profilePic and coverPic are valid Unsplash links
        if (
            !ndata.profilePic ||
            !ndata.coverPic ||
            !validPrefixes.some(prefix => ndata.profilePic.startsWith(prefix)) ||
            !validPrefixes.some(prefix => ndata.coverPic.startsWith(prefix))
        ) {
            return {
                success: false,
                message: "ProfilePic or coverPic not valid link",
            }
        }


        // Check if userName is being updated and is available
        if (oldusername !== ndata.userName) {
            const existingUser = await User.findOne({
                userName: { $regex: new RegExp(`^${ndata.userName}$`, "i") },
            }).select("userName"); // Case-insensitive check & only fetch necessary fields

            if (existingUser) {
                return { success: false, message: "Username already Taken" };
            }
        }

        // Update user profile
        // Fetch existing user to preserve fields
        const existingUser = await User.findOne({ userName: oldusername }).select("userName"); // only fetch necessary fields
        if (!existingUser) {
            return { success: false, message: "User not found" };
        }

        // Preserve immutable fields
        ndata.email = existingUser.email; // Preserve the existing email
        ndata.name = existingUser.name; // Preserve the existing email

        // // Update the userProfile in the database
        const updatedUser = await User.findOneAndUpdate(
            { userName: oldusername }, // Find user by old username
            ndata, // Update with new data (username, email, etc.)
            { new: true } // Return updated document
        ).select("userName"); // only fetch necessary fields

        // show error message when not userProfile Updated
        if (!updatedUser) {
            return { success: false, message: "Failed to update user profile" };
        }


        // Update all payments data with the new username
        await Promise.all([
            Payment.updateMany(
                { from_User: oldusername }, // find by from_User
                {
                    from_User: ndata.userName,
                    profilePic: ndata.profilePic, // Also update profilePic for consistency
                }
            ),

            Payment.updateMany(
                { to_User: oldusername }, // find by to_User
                {
                    to_User: ndata.userName
                }
            ),
        ]);

        // Return the updated user data and a success message 
        return { success: true, message: "Profile updated successfully" };
    } catch (error) {
        return { success: false, message: "An error occurred while updating the profile" };
    }
};