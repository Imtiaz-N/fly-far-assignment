import React, { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-1" : "bg-transparent py-3"
      }`}
    >
      <nav className="container mx-auto px-4">
        {/* For larger screens - horizontal layout */}
        <div className="hidden sm:flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              {/* Dummy image using placeholder.com */}
              <img
                src="https://cdn.flyfarint.com/WL/B2C/FFA2654/companylogo.webp?t=1744316827672"
                alt="FlyFar Logo"
                className={`transition-all duration-300 ${
                  scrolled ? "h-20 w-auto" : "h-20 w-auto"
                }`}
              />
            </a>
          </div>

          {/* Right Section with Buttons */}
          <div className="flex items-center space-x-3">
            <a
              href="#"
              className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition-all font-medium text-sm whitespace-nowrap"
            >
              TRAVEL AGENCY
            </a>
            <a
              href="#"
              className="bg-[#4b4e67] text-white py-2 px-6 rounded-full hover:bg-slate-800 transition-all font-medium text-sm whitespace-nowrap"
            >
              LOGIN / SIGN UP
            </a>
          </div>
        </div>

        {/* For mobile - vertical layout */}
        <div className="flex sm:hidden flex-col items-center">
          {/* Logo centered */}
          <div className="flex justify-center w-full mb-3">
            <a href="/" className="flex items-center">
              <img
                src="https://cdn.flyfarint.com/WL/B2C/FFA2654/companylogo.webp?t=1744316827672"
                alt="FlyFar Logo"
                className={`transition-all duration-300 ${
                  scrolled ? "h-10 w-auto" : "h-14 w-auto"
                }`}
              />
            </a>
          </div>

          {/* Buttons below logo */}
          <div className="flex items-center space-x-3 justify-center">
            <a
              href="#"
              className="bg-green-500 text-white py-1.5 px-4 rounded-full hover:bg-green-600 transition-all font-medium text-xs whitespace-nowrap"
            >
              TRAVEL AGENCY
            </a>
            <a
              href="#"
              className="bg-[#4b4e67] text-white py-1.5 px-4 rounded-full hover:bg-slate-800 transition-all font-medium text-xs whitespace-nowrap"
            >
              LOGIN / SIGN UP
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
