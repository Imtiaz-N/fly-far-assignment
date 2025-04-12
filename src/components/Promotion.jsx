import React, { useEffect, useRef, useState } from "react";

const images = [
  "/promotion3.webp",
  "https://cdn.flyfarint.com/WL/B2C/FFA2654/sliderimg5.webp?t=1744482003020",
  "/promotion1.webp",
  "/promotion2.jpg",
];

const Promotion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Adjust container height to match image
  useEffect(() => {
    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const height = containerWidth / aspectRatio;
      if (containerRef.current) {
        containerRef.current.style.height = `${height}px`;
      }
    };
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-lg bg-black transition-all duration-500"
    >
      <img
        src={images[currentIndex]}
        alt={`Promotion ${currentIndex + 1}`}
        className="w-full h-full object-contain transition-all duration-500"
      />

      {/* Radio buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentIndex === idx
                ? "bg-white border-white"
                : "bg-transparent border-white"
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
