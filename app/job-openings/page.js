"use client";

import React, { useEffect, useState } from "react";
import JobCard from "../components-self/job-card";

export default function Page() {
  const [jobPostings, setJobPostings] = useState([]);

  // Fetch job postings from the API
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
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {jobPostings.map((job) => (
        <JobCard
          key={job._id} // Use the unique ID from the API response
          title={job.title} // Pass the title dynamically
          description={job.job_description} // Pass the job description dynamically
         
        />
      ))}
    </div>
  );
}