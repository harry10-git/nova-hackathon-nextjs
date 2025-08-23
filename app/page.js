"use client";
// import {WavyBackground} from './components/wavy-background'
import { motion } from "framer-motion";
import { AuroraBackground } from "./components/aurora-background";
import { Button } from "./components/moving-borders";
import { useRouter } from "next/navigation"; // Import useRouter


export default function Home() {
  const router = useRouter(); // Initialize useRouter

  const handleButtonClick = () => {
    router.push("/login"); // Navigate to /login
  };
  return (
    <div>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Really Awesome Platform for NovaHackathon
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Finding jobs and connecting them to people
          </div>
          <Button
            borderRadius="1.75rem"
            className="bg-white text-xl dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            onClick={handleButtonClick} // Add onClick handler
          >
            Lets Go
          </Button>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
