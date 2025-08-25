"use client";

import { useEffect, useState } from "react";
import Navbar from "../components-self/Navbar";
import Image from "next/image";
import { AuroraBackground } from "../components/aurora-background-white";
import img from "../assets/superboy.png";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem("email"); // Get email from localStorage
        const response = await fetch("/api/profile/getDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...userDetails.skills];
    updatedSkills[index][field] = value;
    setUserDetails({ ...userDetails, skills: updatedSkills });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = userDetails.skills.filter((_, i) => i !== index);
    setUserDetails({ ...userDetails, skills: updatedSkills });
  };

  const handleAddSkillField = () => {
    const updatedSkills = [
      ...userDetails.skills,
      { skill_id: "", experience: "" },
    ];
    setUserDetails({ ...userDetails, skills: updatedSkills });
  };

  const handleYearOfExpChange = (value) => {
    setUserDetails({ ...userDetails, year_of_exp: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("/api/profile/updateDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <AuroraBackground>

      <div className="grid grid-cols-2 mt-20 justify-center items-center">
        <div className="col-span-1">
          <Image
            src={img}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>

        <div className="col-span-1">
          <div className="p-6">
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="mt-4 text-2xl font-serif">Name: {userDetails.name}</p>
            <p className="text-2xl font-serif">Email: {userDetails.email}</p>
            <p className="text-2xl font-serif">Age: {userDetails.age}</p>
            <div className="mt-4">
              <label className="block font-bold">Years of Experience:</label>
              <input
                type="number"
                value={userDetails.year_of_exp}
                onChange={(e) => handleYearOfExpChange(e.target.value)}
                className="border rounded px-4 py-2"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold font-serif">Skills:</h2>
              {userDetails.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-4 mt-2">
                  <input
                    type="text"
                    value={skill.skill_id}
                    onChange={(e) =>
                      handleSkillChange(index, "skill_id", e.target.value)
                    }
                    className="border rounded px-4 py-2"
                    placeholder="Skill Name"
                  />
                  <input
                    type="number"
                    value={skill.experience}
                    onChange={(e) =>
                      handleSkillChange(index, "experience", e.target.value)
                    }
                    className="border rounded px-4 py-2"
                    placeholder="Experience (Years)"
                  />
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddSkillField}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Add Skill
            </button>
            <br />
            <button
              onClick={handleSaveChanges}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      </AuroraBackground>
    </div>
  );
}
