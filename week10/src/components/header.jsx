import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black text-white flex flex-col fixed top-0 z-40 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white">
          MyWebsite
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/index" className="hover:text-blue-400">
            Home
          </Link>
          {/* <Link to="/about" className="hover:text-blue-400">
            About
          </Link> */}

          <Link
            to="/login"
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden flex flex-col items-center space-y-4 mt-4 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <Link
          to="/"
          className="text-lg hover:text-blue-400"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-lg hover:text-blue-400"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/services"
          className="text-lg hover:text-blue-400"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="text-lg hover:text-blue-400"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500"
          onClick={() => setMenuOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;
