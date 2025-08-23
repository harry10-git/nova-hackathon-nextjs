"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store the token in localStorage
            router.push('/job-openings'); // Redirect to /job-postings
        } else {
            alert(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Login</button>
        </form>
    );
}