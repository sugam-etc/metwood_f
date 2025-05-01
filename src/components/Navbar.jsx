import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiShoppingBag, FiInfo, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/", name: "Home", icon: <FiHome className="mr-2" /> },
    { path: "/store", name: "Store", icon: <FiShoppingBag className="mr-2" /> },
    { path: "/about", name: "About", icon: <FiInfo className="mr-2" /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-light text-gray-800 hover:text-amber-700 transition-colors duration-300">
                Metwood
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? "bg-zinc-800 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {/* {item.icon} */}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500 transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <FiMenu className="h-6 w-6" />
              ) : (
                <FiX className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium mx-2 transition-colors duration-300 ${
                  isActive(item.path)
                    ? "bg-zinc-800 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {/* {item.icon} */}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
