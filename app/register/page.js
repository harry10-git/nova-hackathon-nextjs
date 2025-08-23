"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/aurora-background";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    year_of_exp: "",
    skills: [{ skill_id: "", experience: "" }],
  });

  const router = useRouter();

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { skill_id: "", experience: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("User registered successfully");
      router.push("/login"); // Redirect to login page
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
          Create an Account
        </div>
        <div className="font-light text-base md:text-lg dark:text-neutral-200 text-center">
          Register to start your journey
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-neutral-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col gap-4 shadow-xl"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Years of Experience"
            value={formData.year_of_exp}
            onChange={(e) =>
              setFormData({ ...formData, year_of_exp: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Skills Section */}
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Skill ID"
                value={skill.skill_id}
                onChange={(e) =>
                  handleSkillChange(index, "skill_id", e.target.value)
                }
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Experience"
                value={skill.experience}
                onChange={(e) =>
                  handleSkillChange(index, "experience", e.target.value)
                }
                className="w-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addSkill}
            className="text-sm text-blue-400 hover:underline self-start"
          >
            + Add another skill
          </button>

          {/* Updated Register Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
            >
              <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                <svg
                  className="relative w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                Register
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </AuroraBackground>
  );
}