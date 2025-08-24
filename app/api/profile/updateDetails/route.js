import connectToDatabase from "../../../../lib/mongoose";
import User from "../../../../models/user";

export async function POST(req) {
    try {
        await connectToDatabase(); // Ensure database connection is established

        const body = await req.json(); // Parse the request body
        const { email, skills, year_of_exp } = body;

        if (!email || !skills || year_of_exp === undefined) {
            return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { skills, year_of_exp },
            { new: true }
        );

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Profile updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating user details:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}