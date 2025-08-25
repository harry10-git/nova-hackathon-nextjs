"use client";

import React from "react";
import { InfiniteMovingCards } from "../components/infinite-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div
      className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-white dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "I was struggling to figure out which skills I should actually focus on, but this site made it so much clearer. The course recommendations were spot on, and I even landed an interview two weeks after finishing one of them.",
    name: "Charles Charan",
    title: "Risk and Compliance",
  },
  {
    quote:
      "What I liked most is that it didn’t just throw random jobs at me. It suggested roles based on my profile and skills I could improve. Honestly feels like having a career coach in my pocket.",
    name: "Anton Shakespeare",
    title: "Model Risk ",
  },
  {
    quote: "I’d been applying to jobs for months with no luck. After following the recommended courses here, I added the new skills to my resume and got shortlisted within a week. Totally worth it.",
    name: "Edgar Allan Raj",
    title: "Financial Analyst",
  },
  {
    quote:
      "The platform actually suggested a job I’d never even thought about before. I checked it out, took a quick certification course, and now I’m working in that field. Feels like the right career move.",
    name: "Jane Ojha",
    title: "Data Technology",
  },
  {
    quote:
      "Instead of wasting hours browsing random courses, I just followed the personalized list here. Every course felt relevant to my career path. Highly recommend for anyone serious about upskilling.",
    name: "Ashik Melville",
    title: "Financial Crime",
  },
];
