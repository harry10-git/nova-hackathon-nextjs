// src/app/components/ui/card.js

"use client";

import React from "react";
import { motion } from "framer-motion";

// Main Card container
const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className={`bg-white/70 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 
                rounded-2xl shadow-md overflow-hidden backdrop-blur-sm ${className}`}
  >
    {children}
  </motion.div>
);

// Card Header
const CardHeader = ({ children, className = "" }) => (
  <div className={`p-5 border-b border-gray-100 dark:border-gray-800 ${className}`}>
    {children}
  </div>
);

// Card Title
const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-xl font-semibold text-gray-900 dark:text-white ${className}`}
  >
    {children}
  </h3>
);

// Card Description
const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 dark:text-gray-400 mt-1 ${className}`}>
    {children}
  </p>
);

// Card Content
const CardContent = ({ children, className = "" }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
