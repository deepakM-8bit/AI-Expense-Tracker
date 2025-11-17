import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme system
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window === "undefined") return "light";
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] md:w-[94%] max-w-7xl z-30">
        <div className="backdrop-blur-md bg-white/70 dark:bg-black/50 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg px-4 md:px-6 py-3 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <h1 className="text-lg md:text-2xl font-bold tracking-tight">AI Expense Tracker</h1>
            <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-300">Smarter spending with AI</span>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2"/>
                </svg>
              )}
            </button>

            <Link to="/login" className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              Login
            </Link>

            <Link to="/signup" className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4"/>
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${mobileMenuOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 w-full px-4">
            <div className="backdrop-blur-md bg-white/80 dark:bg-black/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-lg">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block mt-2 px-3 py-2 bg-blue-600 text-white rounded-md text-center">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <main className="pt-36 pb-12 px-6 md:px-10 max-w-7xl mx-auto">
        <section className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-4xl mb-3">
            Smarter Spending With{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              AI-Powered Insights
            </span>
          </h2>

          <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Track daily expenses, visualize patterns, get on-demand AI suggestions, and manage your money effortlessly — all in a single beautiful dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-medium shadow-lg">
              Get Started
            </Link>

            <a href="#features" className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              Learn More
            </a>
          </div>
        </section>
      </main>

      {/* FEATURES */}
      <section id="features" className="px-6 md:px-10 pb-24 max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="mb-3 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-400 text-white flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M2.25 18 9 11.25l4.3 4.3a11.95 11.95 0 0 1 5.8-5.5l2.7-1.2"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
          <p className="text-gray-600 dark:text-gray-300">Visualize monthly, weekly, and category-wise expenses with clear charts.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="mb-3 w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-teal-400 text-white flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
          <p className="text-gray-600 dark:text-gray-300">Personalized suggestions to reduce unnecessary spending and optimize your budget.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="mb-3 w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Simple & Fast</h3>
          <p className="text-gray-600 dark:text-gray-300">Add, edit, and track expenses in seconds with a modern UI built for speed.</p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-black/40 shadow-inner py-12 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-300 px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <div>
              <p className="text-lg font-semibold">AI Expense Tracker</p>
              <p className="mt-2 text-sm">Made with ❤️ to help you spend smarter.</p>
            </div>

            <div className="flex gap-4 items-center">
              <a href="#" className="text-sm hover:underline">Privacy</a>
              <a href="#" className="text-sm hover:underline">Terms</a>
              <a href="#" className="text-sm hover:underline">Contact</a>
            </div>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
