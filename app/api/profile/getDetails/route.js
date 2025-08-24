import connectToDatabase from "../../../../lib/mongoose";
import User from "../../../../models/user";

export async function POST(req) {
    try {
        await connectToDatabase(); // Ensure database connection is established

        const body = await req.json(); // Parse the request body
        const { email } = body;

        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}