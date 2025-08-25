// src/app/recommendations/page.js

"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components-self/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/card";
import { motion } from "framer-motion";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const userId = sessionStorage.getItem("userIdForRecommendation");
      const jobId = sessionStorage.getItem("jobIdForRecommendation");

      if (!userId || !jobId) {
        setError("User or Job ID not found. Please try again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/recommend-courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, jobId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch recommendations");
        }

        const data = await response.json();

        if (data.message) {
          setMissingSkills([]);
          setRecommendations({ message: data.message });
        } else {
          setRecommendations(data.recommendations);
          setMissingSkills(data.missing_skills);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        sessionStorage.removeItem("userIdForRecommendation");
        sessionStorage.removeItem("jobIdForRecommendation");
      }
    };

    fetchRecommendations();
  }, []);

  // 🔹 Loader animation (spiral / bouncing dots)
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
      <p className="mt-4 text-blue-600 font-medium">Fetching recommendations for you...</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
          🎯 Recommended Courses For You
        </h1>

        {isLoading && <LoadingSpinner />}
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-lg shadow-md">
            Error: {error}
          </p>
        )}

        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {recommendations.message ? (
              <p className="text-lg text-green-600 bg-green-100 p-4 rounded-xl shadow">
                {recommendations.message}
              </p>
            ) : (
              <div>
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  Based on the job requirements, you might want to learn:{" "}
                  <strong className="text-blue-600">
                    {missingSkills.join(", ")}
                  </strong>
                  . Here are some curated courses:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(recommendations).map(([skill, course]) => {
                    const cleanedCourse = course.replace(
                      /^(.*?):\s*\1/,
                      "$1"
                    );

                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300">
                          <CardHeader>
                            <CardTitle>📘 {skill}</CardTitle>
                            <CardDescription>
                              A course to help you master this skill
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                              {cleanedCourse}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
