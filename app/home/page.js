"use client";
import { useEffect, useState } from "react";
import Navbar from "../components-self/Navbar";
import { ThreeDMarquee } from "../components/3d-marqquee";

export default function Home() {
    const [email, setEmail] = useState("");

    useEffect(() => {
        const userEmail = localStorage.getItem("email"); // Retrieve the email from localStorage
        setEmail(userEmail);
    }, []);

    const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

    return (
        <div className="">
        <Navbar />

            
            {email ? (
                <p className="text-xl mt-4">Hello, {email}</p>
            ) : (
                <p className="text-xl mt-4">You are not logged in.</p>
            )}

        <div className="bg-red-500 text-white mx-6 rounded-xl px-4 py-2">
            <div className="grid grid-cols-6">
            <div className="col-span-2">
                <h4 className="text-3xl">Total Job Openings: {50} </h4>
            </div>
             
            <div className="col-span-4 bg-yellow-200">
                asfa
            </div>
            </div>
            

        </div>    

        <div className="mx-auto my-10 rounded-3xl bg-gray-950/5 p-2">
        <ThreeDMarquee images={images} />
        </div>
        </div>

    );
}