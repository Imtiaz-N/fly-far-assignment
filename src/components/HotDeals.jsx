import React, { useState } from "react";

const categories = [
  {
    name: "FLIGHT",
    images: [
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealflightimg1.webp?uid=1744476969086",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealflightimg2.webp?uid=1744476969086",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealflightimg3.webp?uid=1744476969086",
    ],
  },
  {
    name: "GROUP FARE",
    images: [
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealgroupfareimg1.webp?uid=1744481253718",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealgroupfareimg2.webp?uid=1744481253718",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealgroupfareimg3.webp?uid=1744481253718",
    ],
  },
  {
    name: "TOUR",
    images: [
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealtourimg1.webp?uid=1744481379775",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealtourimg2.webp?uid=1744481379775",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealtourimg3.webp?uid=1744481379775",
    ],
  },
  {
    name: "VISA",
    images: [
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealvisaimg1.webp?uid=1744481481849",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealvisaimg2.webp?uid=1744481481849",
      "https://cdn.flyfarint.com/WL/FFA2654/hotdealvisaimg3.webp?uid=1744481481849",
    ],
  },
];

const HotDeals = () => {
  const [activeCategory, setActiveCategory] = useState("FLIGHT");

  const currentCategory = categories.find((cat) => cat.name === activeCategory);

  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Hot Deals</h2>

      <div className="flex justify-end mb-8">
        <div className="inline-flex border rounded-full p-2 bg-[#32d095] gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat.name
                  ? "bg-[#525371] text-white shadow-lg"
                  : "text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentCategory?.images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${activeCategory} deal ${idx + 1}`}
            className="rounded-lg shadow-md object-cover w-full h-64"
          />
        ))}
      </div>
    </div>
  );
};

export default HotDeals;
