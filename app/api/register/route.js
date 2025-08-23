import bcrypt from 'bcrypt';
import connectToDatabase from '../../../lib/mongoose';
import User from '../../../models/user';

export async function POST(req) {
    console.log('Register API hit');

    try {
        await connectToDatabase(); // Ensure database connection is established

        const body = await req.json(); // Parse the request body
        const { name, email, password, age, year_of_exp, skills } = body;

        if (!name || !email || !password || !age || !year_of_exp || !skills) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age,
            year_of_exp,
            skills,
        });

        await newUser.save();

        return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error:', error); // Log the error details
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}