"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components-self/Navbar";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications
  const fetchApplications = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setApplications([]);
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/myApplications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      setApplications([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Withdraw function
  const handleWithdraw = async (jobId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const response = await fetch("http://localhost:3000/api/myApplications/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, jobId }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        // Refresh applications after withdrawal
        fetchApplications();
      } else {
        alert(result.error || "Failed to withdraw application.");
      }
    } catch (error) {
      alert("Failed to withdraw application.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-14 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">My Applied Jobs</h1>
        {loading ? (
          <div>Loading...</div>
        ) : applications.length === 0 ? (
          <div>No applications found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map(app => (
              <div key={app.applicationId} className="bg-gray-50 rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{app.job.title}</h2>
                  <div className="mb-1"><strong>Location:</strong> {app.job.location}</div>
                  <div className="mb-1"><strong>Applied On:</strong> {new Date(app.date).toLocaleDateString()}</div>
                  <div className="mb-1"><strong>Expected Salary:</strong> ₹{app.job.expected_salary.toLocaleString()}</div>
                  <div className="mb-2"><strong>Skills Required:</strong>
                    <ul className="list-disc ml-6">
                      {app.job.required_skills.map(skill => (
                        <li key={skill._id}>
                          {skill.skill} ({skill.experience} year{skill.experience > 1 ? "s" : ""})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-2"><strong>Description:</strong> {app.job.job_description}</div>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                  onClick={() => handleWithdraw(app.job._id)}
                >
                  Withdraw
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}