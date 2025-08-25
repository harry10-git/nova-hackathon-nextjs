// Page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import JobCard from "../components-self/job-card";
import Navbar from "../components-self/Navbar";

export default function Page() {
  const [jobPostings, setJobPostings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await fetch("api/job-postings");
        const data = await response.json();
        setJobPostings(data);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };

    fetchJobPostings();
  }, []);

 

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/axiom-pattern.png")',
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
        {jobPostings.map((job) => (
          
            <JobCard
            key={job._id}
              jobId={job._id}
              title={job.title}
              description={job.job_description}
            />
       
        ))}
      </div>
    </div>
  );
}
