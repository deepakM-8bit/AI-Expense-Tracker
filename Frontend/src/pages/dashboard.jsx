import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import AnalyticsSection from "../components/AnalyticsSection";
import AIBotSection from "../components/AIBotSection";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-28 max-w-5xl mx-auto px-4 pb-20 space-y-14">

        <HeroSection />

        <ExpenseForm />

        <ExpenseList />

        <AnalyticsSection />

        <AIBotSection />

      </div>
    </div>
  );
}
