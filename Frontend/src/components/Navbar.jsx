import { useAuth } from "../context/useAuth.jsx";
import { useState, useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function Navbar({ showUserActions = true }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // GLOBAL THEME CONTEXT
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
   <nav className="
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[95%] flex justify-between items-center z-50
        px-6 md:px-10 py-4
        backdrop-blur-xl bg-white/40 dark:bg-gray-900/40
        border border-white/20 dark:border-gray-700/40
        rounded-2xl shadow-soft transition
      ">

      {/* App Title */}
      <h1 className="text-xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        AI Expense Tracker
      </h1>

      <div className="flex items-center gap-4">

        {/* THEME TOGGLE BUTTON - ALWAYS VISIBLE */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? (
            // Moon icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          ) : (
            // Sun icon
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m8-10h2M2 12h2m14.1-7.1l1.4 1.4M4.5 19.5l1.4-1.4m12 0l1.4 1.4M4.5 4.5l1.4 1.4"/>
            </svg>
          )}
        </button>

        {/* DESKTOP USER ACTIONS */}
        {showUserActions && (
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="font-medium flex text-lg hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6 mr-1">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653Zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438ZM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0Z" />
              </svg>
              {user?.name || "Profile"}
            </button>

            <button
              onClick={() => navigate("/dashboard/analytics")}
               className="px-3 py-2 font-medium text-lg bg-gray-700/20 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700/40 dark:text-gray-50 dark:bg-gray-300/20 transition"
            >
               Analytics
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* MOBILE MENU TOGGLE */}
        {showUserActions && (
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="
                M4 6h16M4 12h16M4 18h16
              " />
            </svg>
          </button>
        )}
      </div>

      {/* DESKTOP PROFILE DROPDOWN */}
      {openProfile && (
        <div className="hidden md:block absolute top-16 right-6 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl w-60">
          <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{user?.name}</p>
          <p className="text-gray-900 dark:text-gray-300">{user?.email}</p>
        </div>
      )}

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-xl w-48 space-y-3">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="w-full text-left font-medium text-lg hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
          >
            {user?.name || "Profile"}
          </button>

            <button
              onClick={() => navigate("/dashboard/analytics")}
               className="px-3 py-2 font-medium text-md bg-gray-700/20 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700/40 dark:text-gray-50 dark:bg-gray-300/20 transition"
            >
               Analytics
            </button>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
