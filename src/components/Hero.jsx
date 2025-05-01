import React, { useState, useEffect } from "react";
import bg from "../assets/Images/bg.jpg";
import logo from "../assets/logo.png";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Hero = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Handcrafted furniture with timeless elegance";

  const socialLinks = [
    {
      icon: <FiInstagram className="h-5 w-5" />,
      username: "metwood.crafts",
      url: "https://instagram.com",
    },
    {
      icon: <FiFacebook className="h-5 w-5" />,
      username: "MetwoodFurniture",
      url: "https://facebook.com",
    },
    {
      icon: <FiTwitter className="h-5 w-5" />,
      username: "MetwoodOfficial",
      url: "https://twitter.com",
    },
  ];

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prevText) => prevText + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50); // Adjust typing speed here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={bg}
          alt="Metwood furniture showcase"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0  bg-opacity-30"></div>
      </div>

      {/* Social links sidebar - Desktop */}
      <div className="absolute left-6 bottom-6 z-20 hidden md:flex flex-col space-y-6 items-center">
        <div className="h-24 w-px bg-white bg-opacity-50 mb-2"></div>
        {socialLinks.map((link, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredIcon(index)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-amber-300 transition-colors duration-300 flex items-center"
            >
              <div className="p-2 rounded-full group-hover:bg-white group-hover:bg-opacity-10 transition-all duration-300">
                {link.icon}
              </div>
              <span
                className={`absolute left-full ml-4 whitespace-nowrap text-white bg-black bg-opacity-70 px-3 py-1 rounded-md transition-all duration-300 ${
                  hoveredIcon === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2"
                }`}
              >
                {link.username}
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Hero text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        {/* Logo section */}
        <div className="mb-8 animate-fadeIn">
          <img
            src={logo}
            alt="Metwood Logo"
            className="h-24 sm:h-28 md:h-32 lg:h-40 xl:h-48 w-auto object-contain mx-auto"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fadeIn">
          Metwood Crafts
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mb-8 h-12 flex items-center justify-center">
          {typedText}
          <span className="ml-1 animate-pulse">|</span> {/* Cursor effect */}
        </p>
        <button className="bg-amber-700 hover:bg-amber-800 text-white font-medium py-3 px-8 rounded-md transition duration-300 transform hover:scale-105 animate-fadeIn delay-200">
          Explore Collection
        </button>
      </div>

      {/* Mobile social links (bottom center) */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex md:hidden justify-center space-x-8">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-amber-300 transition-colors duration-300 flex flex-col items-center"
          >
            <div className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300">
              {link.icon}
            </div>
            <span className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {link.username}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
