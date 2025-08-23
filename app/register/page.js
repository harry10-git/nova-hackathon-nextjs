"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/aurora-background";
import { Button } from "../components/moving-borders";

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
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("User registered successfully");
      router.push("/job-openings");
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

          {/* Centered Register Button */}
          <div className="flex justify-center mt-4">
            <Button
              borderRadius="1rem"
              className="bg-green-500 dark:bg-slate-900 text-white text-lg px-10 py-3"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </motion.div>
    </AuroraBackground>
  );
}
