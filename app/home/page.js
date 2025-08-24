"use client";
import { useEffect, useState } from "react";
import Navbar from "../components-self/Navbar";

export default function Home() {
  const [email, setEmail] = useState("");
  const [totalJobs, setTotalJobs] = useState(0);
  const [popularSkills, setPopularSkills] = useState([]);

  useEffect(() => {
    // Retrieve the email from localStorage
    const userEmail = localStorage.getItem("email");
    setEmail(userEmail);

    // Fetch total jobs from the API
    const fetchTotalJobs = async () => {
      try {
        const response = await fetch("/api/home/totalJobs");
        if (response.ok) {
          const data = await response.json();
          setTotalJobs(data.totalJobPostings);
        } else {
          console.error("Failed to fetch total jobs");
        }
      } catch (error) {
        console.error("Error fetching total jobs:", error);
      }
    };

    // Fetch popular skills from the API
    const fetchPopularSkills = async () => {
      try {
        const response = await fetch("/api/home/popularSkills");
        if (response.ok) {
          const data = await response.json();
          // Take the top 4 most popular skills
          setPopularSkills(data.slice(0, 4));
        } else {
          console.error("Failed to fetch popular skills");
        }
      } catch (error) {
        console.error("Error fetching popular skills:", error);
      }
    };

    fetchTotalJobs();
    fetchPopularSkills();
  }, []);

  return (
    <div className="">
      <Navbar />

      {email ? (
        <p className="text-xl mt-4">Hello, {email}</p>
      ) : (
        <p className="text-xl mt-4">You are not logged in.</p>
      )}

      <div className="mx-6 rounded-xl px-4 py-2">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-2 flex flex-col gap-2 items-center justify-center bg-red-500 px-2 py-4">
            <h4 className="text-3xl text-white font-bold">Total Job Openings :</h4>
            <h3 className="text-5xl font-extrabold text-white"> {totalJobs}</h3>
          </div>

          <div className="col-span-3 px-2 py-4 flex flex-col justify-center items-center bg-red-500">
  <h4 className="text-2xl font-bold text-white mb-3">Top Skills</h4>
  <div className="overflow-x-auto w-full">
    <table className="min-w-full border border-red-200 divide-y-2 divide-red-300">
      <thead className="bg-white text-black">
        <tr>
          <th className="px-4 py-2 text-left font-semibold">Skill</th>
          <th className="px-4 py-2 text-left font-semibold">Jobs</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-red-200 bg-white">
        {popularSkills.map((skillObj, index) => {
          const skillName = Object.keys(skillObj)[0];
          const skillCount = skillObj[skillName];
          return (
            <tr
              key={index}
              className="hover:bg-red-50 transition duration-200"
            >
              <td className="px-4 py-2 text-red-700 font-medium">{skillName}</td>
              <td className="px-4 py-2 text-gray-700">{skillCount} jobs</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
        </div>

        <div className="col-span-1">
            afa
        </div>

     

        </div>
      </div>
    </div>
  );
}