// app/components-self/JobCard.js

"use client";

import React from "react";
import { motion } from "framer-motion";

const JobCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="bg-white/70 dark:bg-red-500 borde
                rounded-2xl shadow-md overflow-hidden backdrop-blur-sm p-6 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
        <p className="text-sm text-neutral-100  mt-1">{job.location}</p>
        <p className="text-gray-700 dark:text-neutral-100 my-4 text-sm">{job.job_description}</p>
      
        <div className="mb-4">
          <h4 className="font-semibold text-neutral-50 mb-2 text-sm">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {job.required_skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full text-blue-700">
                {skill.skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-right text-lg font-bold text-neutral-100 mt-4">
        ₹{job.expected_salary.toLocaleString()}
      </div>
    </motion.div>
  );
};

export default JobCard;