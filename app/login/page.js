"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/aurora-background";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token); // Store the token
      localStorage.setItem("email", formData.email); // Store the email
      localStorage.setItem("userId", data.userId);
      router.push("/home"); // Redirect to home page
    } else {
      alert(data.error);
    }
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col gap-6 items-center justify-center px-6 py-16 w-full"
      >
        <div className="text-3xl md:text-5xl font-bold dark:text-white text-center">
          Welcome Back
        </div>
        <div className="font-light text-base md:text-lg dark:text-neutral-200 text-center">
          Login to continue exploring opportunities
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-neutral-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col gap-4 shadow-xl"
        >
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Updated Login Button */}
          <button
            type="submit"
            className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
          >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Login
            </span>
          </button>
        </form>

        {/* Register Section */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-sm dark:text-neutral-300">
            Not registered yet?
          </p>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Register
          </button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}