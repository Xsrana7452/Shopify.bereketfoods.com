"use client";

import { useEffect, useRef } from "react";

export default function AboutVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Smooth 0.5x half-speed playback
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A2415]">
      <video
        ref={videoRef}
        src="/assets/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(e) => {
          (e.target as HTMLVideoElement).playbackRate = 0.5;
        }}
        className="absolute inset-0 w-full h-full object-cover scale-105 opacity-40 transition-opacity duration-1000"
      />
      {/* High-Contrast Gourmet Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#0A2415]/95 z-10 pointer-events-none" />
    </div>
  );
}
