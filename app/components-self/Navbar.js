"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa"; // Import the profile icon from react-icons

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Check if the user is logged in
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push("/login"); // Redirect to login page
    };

    const handleLogin = () => {
        router.push("/login"); // Redirect to login page
    };

    const handleProfileClick = () => {
        router.push("/profile"); // Redirect to profile page
    };

    return (
        <nav className="bg-red-500 text-white flex items-center justify-between px-6 py-4">
            {/* Left Section */}
            <div className="flex items-center space-x-2">
                <img
                    src="https://create.hsbc/content/dam/brandhub/brand/ld-history/hexagon_1192x671.jpg"
                    alt="Hirelink Logo"
                    className="h-8 w-12"
                />
                <span className="text-xl font-bold">Hirelink</span>
            </div>

            {/* Middle Section */}
            <div className="flex space-x-6">
                <a href="/home" className="hover:underline">Home</a>
                <a href="/job-openings" className="hover:underline">Jobs</a>
                <a href="/recommend-jobs" className="hover:underline">Recommend Jobs</a>
                <a href="/myApplications" className="hover:underline">My Applications</a>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {isLoggedIn && (
                    <FaUserCircle
                        className="text-white text-3xl cursor-pointer hover:opacity-80"
                        onClick={handleProfileClick}
                    />
                )}
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-200"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="bg-white text-red-500 px-4 py-2 rounded hover:bg-gray-200"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}