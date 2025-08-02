import { useState } from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaGamepad, FaRocket, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const NavLinks = () => (
    <>
      <Link to="/" onClick={closeMenu} className="hover:text-yellow-300 transition">Home</Link>
      <Link to="/progress" onClick={closeMenu} className="hover:text-yellow-300 transition">Progress</Link>
      <Link to="/test-series" onClick={closeMenu} className="hover:text-yellow-300 transition">Test Series</Link>
      <Link to="/quantumseries" onClick={closeMenu} className="hover:text-yellow-300 transition">QuantumSeries</Link>
      <Link to="/pdfnotes" onClick={closeMenu} className="hover:text-yellow-300 transition">PDF Notes</Link>
      <Link to="/videolec" onClick={closeMenu} className="hover:text-yellow-300 transition">Video Lectures</Link>
      <Link to="/games" onClick={closeMenu} className="hover:text-yellow-300 transition flex items-center gap-1">
        <FaGamepad />
        Games
      </Link>
      <Link to="/about" onClick={closeMenu} className="hover:text-yellow-300 transition">About</Link>
      {isSignedIn && (
        <div className="ml-2">
          <UserButton afterSignOutUrl="/login" />
        </div>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <FaRocket className="text-yellow-300" />
          <span className="tracking-wide">ALPHA-X AI</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
          <NavLinks />
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-900 px-6 py-4 space-y-4 text-white text-sm font-medium flex flex-col">
          <NavLinks />
        </div>
      )}
    </header>
  );
}
