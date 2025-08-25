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
} from "../components/card"; // Assuming you have a Card component

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // Retrieve IDs from sessionStorage
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, jobId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch recommendations");
        }

        const data = await response.json();

        if (data.message) {
          // Handle cases where the user has all skills
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
        // Clean up sessionStorage
        sessionStorage.removeItem("userIdForRecommendation");
        sessionStorage.removeItem("jobIdForRecommendation");
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Recommended Courses For You
        </h1>

        {isLoading && <p>Loading recommendations...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {recommendations && (
          <div>
            {recommendations.message ? (
              <p className="text-lg text-green-600">
                {recommendations.message}
              </p>
            ) : (
              <div>
                <p className="text-lg mb-6">
                  Based on the job requirements, you might want to learn the
                  following skills:{" "}
                  <strong>{missingSkills.join(", ")}</strong>. Here are some
                  course suggestions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(recommendations).map(([skill, course]) => {
                  // Remove duplicate course text if repeated
                  const cleanedCourse = course.replace(/^(.*?):\s*\1/, "$1");

                  return (
                    <Card key={skill}>
                      <CardHeader>
                        <CardTitle>Skill: {skill}</CardTitle>
                        <CardDescription>
                          A course to help you master this skill.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">{cleanedCourse}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}