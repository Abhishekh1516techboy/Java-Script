import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import User from "@/models/User";
import connectToDb from "@/lib/dbConnect";

export default async function UserPage ({ params }) {
    const { username } = await params; // Destructure username from params

    try {
        // Connect to the database
        await connectToDb();

        // Fetch user from the database
        const user = await User.findOne({ userName: username }).select("userName"); // select only userName
        if (!user) {
            return notFound(); // Return 404 if user not found
        }

        // Render the PaymentPage with the username
        return <PaymentPage userName={username} />;
    } catch (error) {
        return notFound(); // Fallback to 404 on error
    }
}
