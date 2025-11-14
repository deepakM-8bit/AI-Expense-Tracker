import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-bold tracking-tight">AI Expense Tracker</h1>

        <div className="flex gap-6 text-lg">
          <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
          Smarter Spending With <span className="text-blue-600">AI-Powered</span> Insights
        </h2>

        <p className="mt-5 text-lg text-gray-600 max-w-2xl">
          Track your daily expenses, visualize spending patterns, get weekly AI suggestions,
          and manage your money effortlessly — all in one clean and powerful dashboard.
        </p>

        <Link
          to="/login"
          className="mt-8 px-8 py-4 bg-blue-600 text-white text-xl font-medium rounded-2xl shadow-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="px-10 pb-24 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
          <h3 className="text-2xl font-semibold mb-3">Smart Analytics</h3>
          <p className="text-gray-600">
            Visualize monthly, weekly, and category-wise expenses with clean charts.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
          <h3 className="text-2xl font-semibold mb-3">AI Insights</h3>
          <p className="text-gray-600">
            Personalized suggestions to reduce unnecessary spending and optimize your budget.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
          <h3 className="text-2xl font-semibold mb-3">Simple & Fast</h3>
          <p className="text-gray-600">
            Add, edit, and track expenses in seconds with a clean UI designed for speed.
          </p>
        </div>
      </section>
    </div>
  );
}
