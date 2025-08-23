import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    year_of_exp: { type: Number, required: true },
    skills: [
        {
            skill_id: { type: mongoose.Schema.Types.ObjectId, required: true },
            experience: { type: Number, required: true },
        },
    ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;