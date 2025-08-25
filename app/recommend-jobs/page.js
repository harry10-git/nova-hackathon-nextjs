// app/recommend-jobs/page.js

"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components-self/Navbar";
import JobCard from "../components/JobCard"; // We will create this component
import { motion } from "framer-motion";
import { AuroraBackground } from "../components/aurora-background-white";

export default function RecommendJobsPage() {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      // Assumes you store the logged-in user's ID in sessionStorage
      const userId = localStorage.getItem("userId"); 

      if (!userId) {
        setError("User ID not found. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/recommend-jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch job recommendations");
        }

        const data = await response.json();
        setRecommendedJobs(data.recommended_jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <p className="mt-4 text-blue-600 font-medium">Finding the best jobs for you...</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <AuroraBackground>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-black">
          🚀 AI recommended jobs for you based on your profile
        </h1>

        {isLoading && <LoadingSpinner />}
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg shadow-md">
            Error: {error}
          </p>
        )}

        {!isLoading && !error && recommendedJobs.length === 0 && (
          <p className="text-lg text-gray-600 bg-gray-100 p-4 rounded-xl shadow">
            No suitable job recommendations found at the moment.
          </p>
        )}

        {recommendedJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {recommendedJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </motion.div>
        )}
      </div>
      </AuroraBackground>
    </div>
  );
}