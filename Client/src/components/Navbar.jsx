import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "/Vibecast2.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // trigger after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        scrolled ? "bg-black/50" : "bg-transparent"
      } fixed w-full top-0 z-50 onscroll:bg-white/50`}
    >
      {/* Top Row - Logo Only */}
      <Link to="/">
        <div className="hidden lg:block">
          <div className="pt-4 -mb-3 flex-row justify-center mx-auto items-center text-center">
            {/* <img
              src={logo}
              className="w-80 h-auto"
              alt="Vibecast Entertainment Network"
            /> */}
            <h1
              className="text-5xl font-bold pl-1  text-[#7b024d]"
              style={{ fontFamily: "MagnificoDaytime, sans-serif" }}
            >
              VIBECAST
            </h1>
            <p
              className="text-uppercase text-2xl p-0 -mt-1 text-[#7b024d] font-light"
              style={{ fontFamily: "Cosmic, sans-serif" }}
            >
              Entertainment Network
            </p>
          </div>
        </div>
      </Link>

      {/* Bottom Row - Navigation Menu */}
      <div className="navbar px-4 lg:px-8 pb-3">
        {/* Mobile - Logo Left, Menu Right */}
        <Link to="/">
          <div className="lg:hidden flex-1">
            {/* <img src={logo} className="w-52 h-auto" alt="Vibecast" /> */}
            <h1
              className="text-3xl font-bold pl-1  text-[#7b024d]"
              style={{ fontFamily: "MagnificoDaytime, sans-serif" }}
            >
              VIBECAST
            </h1>
            <p
              className="text-uppercase text-lg p-0 -mt-2 text-[#7b024d] font-light"
              style={{ fontFamily: "Cosmic, sans-serif" }}
            >
              Entertainment Network
            </p>
          </div>
        </Link>

        {/* Desktop Menu - Centered */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <ul className="menu menu-horizontal gap-2">
            <li>
              <Link
                to="/"
                className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                onClick={closeMenu}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/games"
                className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                onClick={closeMenu}
              >
                Games
              </Link>
            </li>
            <li>
              <Link
                to="/comic"
                className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                onClick={closeMenu}
              >
                Comic
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost p-2 text-[#7b024d] hover:text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {/* Hamburger Icon */}
            {!isMenuOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
            {/* Close Icon (X) */}
            {isMenuOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white-900/95 backdrop-blur-md animate-slide-up">
            <ul className="menu p-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 block"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 block"
                  onClick={closeMenu}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 block"
                  onClick={closeMenu}
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  to="/comic"
                  className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 block"
                  onClick={closeMenu}
                >
                  Comic
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-[#7b024d] font-cosmic text-lg px-4 py-3 rounded-lg hover:bg-white/30 transition-all duration-300 block"
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
