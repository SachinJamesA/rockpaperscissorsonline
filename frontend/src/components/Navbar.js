import React, { useState, useEffect } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Home from "./Home";
import Feedback from "./Feedback";

const Navbar = ({ showAlert }) => {
  const [activeLink, setActiveLink] = useState("Home");
  const [active, setActive] = useState("navbar");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Handle the navbar visibility
  const toggleNavbar = (isOpen) => {
    setActive(
      isOpen ? "navbar activeNavbar bg-white/90 dark:bg-gray-800" : "navbar"
    );
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="navbar-section sticky top-0 bg-white/20 dark:bg-gray-900 z-[1000] backdrop-blur-xl shadow-xl transition-all duration-300 lg:bg-white/20 lg:dark:bg-gray-900">
      <div className="header flex items-center justify-between py-2 lg:py-0">
      <div className="logodiv flex-shrink-0 ml-4">
          <Link to="/">
            <h1 className="text-xl font-bold dark:text-white">Snake, Water & Gun</h1>
          </Link>
        </div>

        {/* Navbar content */}
        <div
          className={`${active} lg:bg-transparent w-full p-4 text-center absolute top-0 left-[-500%] z-[3000] lg:left-0 lg:flex lg:items-center md:justify-between lg:justify-end transition-transform duration-300 lg:static`}
        >
          {/* Nav List */}
          <ul className="navList lg:flex lg:items-center">
              <li className="navItem list-none mt-2 lg:mt-0 lg:mr-3">
                <Link
                  to="/"
                  className={`navLink text-md font-medium hover:text-[#4668DF] dark:text-white ${
                    activeLink === Home
                      ? "text-[#775BE5] dark:text-[#775BE5]"
                      : "text-black"
                  }`}
                  onClick={() => setActiveLink("Home")}
                >
                  Home
                </Link>
              </li>

              <li className="navItem list-none mt-2 lg:mt-0 lg:mr-3">
                <Link
                  to="/feedback"
                  className={`navLink text-md font-medium hover:text-[#4668DF] dark:text-white ${
                    activeLink === Feedback
                      ? "text-[#775BE5] dark:text-[#775BE5]"
                      : "text-black"
                  }`}
                  onClick={() => setActiveLink("Feedback")}
                >
                  Feedback
                </Link>
              </li>

            {/* Theme Toggle - Desktop view */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
              className={`hidden lg:block px-3 py-2 rounded lg:mr-1 transition-colors duration-300 ${
                theme === "light"
                  ? "bg-[rgb(240,240,240)] text-black hover:bg-[rgb(230,230,230)]"
                  : "bg-[rgb(30,30,30)] text-white hover:bg-[rgb(50,50,50)]"
              }`}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* Close Button for Mobile */}
            <div
              className="absolute top-3 right-3 text-3xl cursor-pointer lg:hidden transition-transform duration-300 hover:rotate-90"
              onClick={() => toggleNavbar(false)}
            >
              <IoCloseCircle />
            </div>
          </ul>
        </div>

        {/* Hamburger Menu and Theme Toggle */}
        <div className="hamburger-theme-toggle flex items-center space-x-3 lg:hidden mr-3">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            className={`px-3 py-2 rounded transition-colors duration-300 ${
              theme === "light"
                ? "bg-[rgb(240,240,240)] text-black hover:bg-[rgb(230,230,230)]"
                : "bg-[rgb(30,30,30)] text-white hover:bg-[rgb(50,50,50)]"
            }`}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button
            className="bars transition-transform duration-300 hover:rotate-90 text-black dark:text-white"
            onClick={() => toggleNavbar(true)}
          >
            <FaBars />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
