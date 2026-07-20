"use client";

import { useState, useRef, useEffect } from "react";

const VIDEOS = [
  "/assets/videos/hero-bg.mp4",
  "/assets/videos/vid 1.mp4",
  "/assets/videos/vid 2.mp4",
  "/assets/videos/background.mp4",
];

export default function HeroVideoBackground() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setFade(true);
      setTimeout(() => {
        setActiveVideoIndex((prevIndex) => (prevIndex + 1) % VIDEOS.length);
        setFade(false);
      }, 800); // 800ms smooth crossfade duration
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [activeVideoIndex]);

  // Ensure video plays when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeVideoIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A2614]">
      {/* Background Video Player */}
      <video
        ref={videoRef}
        src={VIDEOS[activeVideoIndex]}
        autoPlay
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
          fade ? "opacity-0 scale-105 filter blur-sm" : "opacity-100 scale-100 filter blur-0"
        }`}
      />

      {/* Video Indicator Pills */}
      <div className="absolute top-24 right-6 sm:right-10 z-20 flex gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {VIDEOS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setFade(true);
              setTimeout(() => {
                setActiveVideoIndex(idx);
                setFade(false);
              }, 400);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === activeVideoIndex ? "w-6 bg-[var(--color-gold)]" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Switch to video ${idx + 1}`}
          />
        ))}
      </div>

      {/* Gourmet Dark Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2614] via-transparent to-black/50 z-10 pointer-events-none" />
    </div>
  );
}
