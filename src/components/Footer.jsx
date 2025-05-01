import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaPinterestP,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-amber-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-12">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4 tracking-wide">Metwood</h3>
            <p className="text-amber-100 text-sm leading-relaxed max-w-xs flex flex-col md:flex-row gap-2 md:gap-4">
              <a
                className="flex items-center gap-1"
                href="https://maps.app.goo.gl/x8FPp3tp4YAJGeXA9"
                target="_blank"
              >
                <FaLocationDot /> <span>Lakeside street, Pokhara 33700</span>
              </a>
              <span className="flex items-center gap-1">
                <FaPhone /> <span>9856064004</span>
              </span>
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-lg mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/store" className="hover:text-white transition">
                    Store
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-amber-700 hover:bg-white hover:text-amber-800 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-amber-700 hover:bg-white hover:text-amber-800 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-amber-700 hover:bg-white hover:text-amber-800 transition"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-700 pt-6 text-center">
          <p className="text-sm text-amber-200">
            &copy; {new Date().getFullYear()} Metwood. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
