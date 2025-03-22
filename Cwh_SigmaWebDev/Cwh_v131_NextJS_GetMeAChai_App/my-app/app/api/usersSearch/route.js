import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";


function escapeRegex (string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
}


export async function GET (request) {
    await dbConnect(); // Ensure database is connected

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    try {
        let query = {};
        if (search.trim()) {
            const safeSearch = escapeRegex(search);
            query.userName = { $regex: safeSearch, $options: "i" }; // Case-insensitive search
        }

        const users = await User.find(query).limit(limit).skip((page - 1) * limit).select("userName _id profilePic createdAt email"); // Optimize query, only fetch necessary fields

        const totalUsers = await User.countDocuments(query);

        return NextResponse.json(
            {
                users,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
