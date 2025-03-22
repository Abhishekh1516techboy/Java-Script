import { NextResponse } from "next/server";
import connectToDb from "@/lib/dbConnect"; // MongoDB connection
import Contact from "@/models/Contact"; // Contact Model

export async function POST (req) {
    try {
        await connectToDb();

        const { name, email, phone, message } = await req.json();

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json({ error: "All fields except message are required." }, { status: 400 });
        }

        // Save to MongoDB
        const contact = new Contact({ name, email, phone, message: message || "" });
        const savedContact = await contact.save();

        return NextResponse.json({ message: "Message sent successfully!", id: savedContact._id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save contact", details: error.message }, { status: 500 });
    }
}
