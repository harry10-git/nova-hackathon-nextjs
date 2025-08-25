"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components-self/Navbar";
import { WavyBackground } from "../../components/wavy-background";

export default function JobDetailsPage() {
  const { jobid } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/job-postings/${jobid}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, [jobid]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div
    >
      <Navbar />
      
      <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="max-w-2xl mx-auto mt-14 p-6 bg-white rounded border-gray-300 border-1 shadow hover:scale-105 transition">
        <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
        <div className="mb-2 text-gray-700">
          <strong>Location:</strong> {job.location}
        </div>
        <div className="mb-2 text-gray-700">
          <strong>Posting Date:</strong> {job.posting_date}
        </div>
        <div className="mb-2 text-gray-700">
          <strong>Expected Salary:</strong> ₹{job.expected_salary.toLocaleString()}
        </div>
        <div className="mb-4 text-gray-700">
          <strong>Required Skills:</strong>
          <ul className="list-disc ml-6">
            {job.required_skills.map((skillObj, idx) => (
              <li key={idx}>
                {skillObj.skill} ({skillObj.experience} year{skillObj.experience > 1 ? "s" : ""} experience)
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6 text-gray-700">
          <strong>Job Description:</strong>
          <p>{job.job_description}</p>
        </div>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
          onClick={() => {/* Apply job functionality to be added */}}
        >
          Apply Job
        </button>
      </div>
      </WavyBackground>
    </div>
  );
}