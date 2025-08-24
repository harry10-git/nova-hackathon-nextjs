import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../lib/mongoose';
import User from '../../../models/user';

export async function POST(req) {
    console.log('Login API hit');

    try {
        await connectToDatabase(); // Ensure database connection is established

        const body = await req.json(); // Parse the request body
        const { email, password } = body;

        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return new Response(
                JSON.stringify({ error: 'Invalid credentials' }),
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'mysecret',
            { expiresIn: '1h' }
        );

        // ✅ Return both token and userId
        return new Response(
            JSON.stringify({ token, userId: user._id }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500 }
        );
    }
}
