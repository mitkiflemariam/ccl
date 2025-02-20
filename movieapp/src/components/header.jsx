import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" w-full bg-black text-white flex flex-col fixed top-0 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-3xl font-bold text-white">
          MyWebsite
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-blue-400">
            Home
          </a>
          <a href="#" className="hover:text-blue-400">
            About
          </a>
          <a href="#" className="hover:text-blue-400">
            Services
          </a>
          <a href="#" className="hover:text-blue-400">
            Contact
          </a>
          <a
            href="#"
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
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
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-6">
          <a href="#" className="text-lg hover:text-blue-400">
            Home
          </a>
          <a href="#" className="text-lg hover:text-blue-400">
            About
          </a>
          <a href="#" className="text-lg hover:text-blue-400">
            Services
          </a>
          <a href="#" className="text-lg hover:text-blue-400">
            Contact
          </a>
          <a
            href="#"
            className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-500"
          >
            Sign Up
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
