"use client";
import { useEffect, useState } from "react";
import Navbar from "../components-self/Navbar";

export default function Home() {
    const [email, setEmail] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem("email"); // Retrieve the email from localStorage
        setEmail(userEmail);
    }, []);

    return (
        <div className="">
        <Navbar />
        
            <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
            {email ? (
                <p className="text-xl mt-4">Hello, {email}</p>
            ) : (
                <p className="text-xl mt-4">You are not logged in.</p>
            )}
        </div>
    );
}