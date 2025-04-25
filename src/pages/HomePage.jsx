import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/login");
  };

  // Split heading into words for individual animation
  const headingWords = [
    "We",
    "are",
    "a",
    "digital",
    "design",
    "and",
    "motion",
    "agency",
  ];

  // Word animation component
  const AnimatedWord = ({ word }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <span
        className={`inline-block transition-all duration-300 mr-4 ${
          isHovered ? "text-blue-500 -translate-y-2" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {word}
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="w-full py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold">cuberto</div>
          <button className="text-base sm:text-lg">menu</button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col justify-center px-4 sm:px-10 md:px-16 lg:px-24 py-6 sm:py-8 md:py-12">
        <div className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
          {/* Small image for mobile, similar to the reference */}
          <div className="mb-6 md:mb-10 max-w-xs sm:max-w-sm mx-auto md:hidden">
            <img
              src="/api/placeholder/300/200"
              alt="Design sample"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Animated heading with responsive text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {headingWords.map((word, index) => (
              <AnimatedWord key={index} word={word} />
            ))}
          </h1>

          {/* Image shown only on larger screens, positioned to the side as in reference */}
          <div className="hidden md:block absolute right-8 lg:right-16 top-1/3 max-w-xs lg:max-w-sm">
            <img
              src="/api/placeholder/400/320"
              alt="Design sample"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Call to action button */}
          <div className="mt-10 sm:mt-16">
            <button
              onClick={handleSignupClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-md text-lg sm:text-xl transition-all duration-300 hover:scale-105"
            >
              Signup
            </button>
          </div>
        </div>
      </main>

      {/* Footer with responsive spacing */}
      <footer className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12">
        <div className="flex justify-end">
          <div className="rounded-full bg-gray-100 p-4 sm:p-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
