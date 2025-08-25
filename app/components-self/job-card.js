"use client";

import React from "react";
import { useRouter } from "next/navigation"; 
import { CardBody, CardContainer, CardItem } from "../components/3d-card";

export default function JobCard({
  jobId,
  title,
  description,
}) {
  const router = useRouter();

  const handleTryNow = async () => {
    const userId = localStorage.getItem("userId"); // ✅ directly get from localStorage
    if (!userId) {
      alert("You must be logged in to get recommendations.");
      // Optionally redirect
      // router.push("/login");
      return;
    }

    try {
      // ✅ Store IDs in sessionStorage
      sessionStorage.setItem("userIdForRecommendation", userId);
      sessionStorage.setItem("jobIdForRecommendation", jobId);

      // Navigate to recommendations page
      router.push("/recommendations");
    } catch (error) {
      console.error("Error preparing for recommendations:", error);
      alert("Could not prepare your recommendations. Please try again.");
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-white dark:border-black/[0.2] border-black/[0.1] w-auto sm:w-[28rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-red-600"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-600"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://rukminim2.flixcart.com/image/704/844/xif0q/mug/8/v/p/hsbc-logo-coffeemug-for-gift-and-choice-for-kids-friends-350-1-original-imagmfguhug2cxhr.jpeg?q=90&crop=false"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as="button"
            onClick={handleTryNow}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-neutral-800"
          >
            AI Course Recommendations →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-blue-500 dark:bg-red-500 dark:text-neutral-50 text-red-500 text-xs font-bold"
          >
            Apply Job
          </CardItem>
          
        </div>
        <div className="flex items-center justify-center">
          <CardItem
            translateZ={20}
            as="button"
            className="px-16 py-2 rounded-xl bg-blue-500 dark:bg-neutral-500 dark:text-white text-red-500 text-xs font-bold"
            onClick={() => router.push(`/job-openings/${jobId}`)} 
          >
            Know More
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
