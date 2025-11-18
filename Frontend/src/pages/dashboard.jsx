import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import AnalyticsSection from "../components/AnalyticsSection.jsx";
import AIBotSection from "../components/AIBotSection.jsx";
import { FooterSection } from "../components/Footer.jsx";
import { useAuth } from "../context/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token,navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-28 max-w-7xl mx-auto px-4 pb-2 space-y-14">

        <HeroSection />

        <ExpenseForm />

        <ExpenseList />

      </div>

      <FooterSection />
       {/* Slide-over / Drawer for Analytics */}
      {showAnalytics && (
        <>
          {/* backdrop */}
          <div
            onClick={() => navigate("/dashboard")}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          />

          {/* panel */}
          <aside
            className="
              fixed top-0 right-0 h-full z-50
              w-full sm:w-[92%] md:w-3/4 lg:w-2/3 xl:w-3/5
              bg-white/30 dark:bg-gray-900/30
              backdrop-blur-xl border-l border-white/20 dark:border-gray-700/30
              p-6 overflow-auto
              transition-transform duration-300
            "
            role="dialog"
            aria-modal="true"
          >
            {/* top bar */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Analytics & AI Insights
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Deep interactive charts and personalized suggestions
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                  aria-label="Close analytics panel"
                >
                  Close
                </button>
              </div>
            </div>

            {/* content grid: analytics + ai */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsSection />
              <AIBotSection />
            </div>
          </aside>
        </>
      )}

    </div>
  );
}
