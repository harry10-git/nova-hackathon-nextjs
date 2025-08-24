// src/app/components/ui/card.js

"use client";

import React from "react";

// Main Card container
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md overflow-hidden ${className}`}
  >
    {children}
  </div>
);

// Card Header
const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Card Title
const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-lg font-bold text-gray-900 dark:text-white ${className}`}
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
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent };