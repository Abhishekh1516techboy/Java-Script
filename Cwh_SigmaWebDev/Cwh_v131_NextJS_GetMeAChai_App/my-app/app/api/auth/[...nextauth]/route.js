import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/User";  // MongoDB model
import connectToDb from "@/lib/dbConnect"; // MongoDB connection

// Helper function to create or update user in MongoDB
const handleMongoDb = async (user, provider) => {

    const { name, email, image } = user; // Extract user details

    // MongoDB: Check if user exists
    let existingUserMongo = await User.findOne({ email }); // Find user by email

    if (!existingUserMongo) {
        // Create a new user in MongoDB if not found
        await User.create({
            name,
            email,
            profilePic: image,
            userName: email.split("@")[0], // Set username as email prefix
            provider,
        });
    } else {
        // If user already exists in MongoDB, update them
        existingUserMongo.provider = provider;
        existingUserMongo.name = name || existingUserMongo.name;
        existingUserMongo.profilePic = image || existingUserMongo.profilePic;
        existingUserMongo.updatedAt = new Date();
        await existingUserMongo.save(); // Save the updated user
    }

};

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn ({ user, account, profile, email, credentials }) {
            try {
                if (account?.provider === "github" || account?.provider === "google") {

                    await connectToDb(); // MongoDb Connect

                    // set Account provider name ["Google", "Github" etc..]
                    const provider = account.provider;

                    // Handle MongoDB user creation or update
                    await handleMongoDb(user, provider);

                    return true; // Allow sign-in
                }

                return false; // Deny sign-in for unsupported providers
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false; // Deny sign-in on error
            }
        },

        async session ({ session, token }) {
            try {
                await connectToDb(); // Connect to MongoDB

                // Fetch user from MongoDB
                const dbUserMongo = await User.findOne({
                    email: token.email,
                    provider: token.provider,
                });

                if (dbUserMongo) {
                    session.user.id = dbUserMongo._id.toString();
                    session.user.provider = dbUserMongo.provider;
                    session.user.userName = dbUserMongo.userName;
                } else {
                    console.error("User not found in MongoDB database during session callback");
                }

            } catch (error) {
                console.error("Error in session callback:", error);
            }

            return session;
        },

        async jwt ({ token, user, account }) {
            if (account) {
                token.provider = account.provider;
            }
            if (user) {
                token.email = user.email;
            }
            return token;
        },

    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };  
