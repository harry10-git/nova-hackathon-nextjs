"use client";
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        year_of_exp: '',
        skills: [{ skill_id: '', experience: '' }],
    });

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index][field] = value;
        setFormData({ ...formData, skills: updatedSkills });
    };

    const addSkill = () => {
        setFormData({ ...formData, skills: [...formData.skills, { skill_id: '', experience: '' }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('User registered successfully');
        } else {
            alert(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
            <input
                type="number"
                placeholder="Years of Experience"
                value={formData.year_of_exp}
                onChange={(e) => setFormData({ ...formData, year_of_exp: e.target.value })}
            />
            {formData.skills.map((skill, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Skill ID"
                        value={skill.skill_id}
                        onChange={(e) => handleSkillChange(index, 'skill_id', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Experience"
                        value={skill.experience}
                        onChange={(e) => handleSkillChange(index, 'experience', e.target.value)}
                    />
                </div>
            ))}
            <button type="button" onClick={addSkill}>
                Add Skill
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Register</button>
        </form>
    );
}