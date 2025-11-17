import { useAuth } from "../context/useAuth.jsx";
import { useState } from "react";
import axios from "axios";

export default function AiInsights() {
  const { token } = useAuth();
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:3000/api/ai/insights", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
      setInsights("AI is currently busy. Try again in a moment ❤️");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">AI Insights 🤖</h3>

        <button
          onClick={generateInsights}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Generate Insights"}
        </button>
      </div>

      <div className="mt-4 prose prose-sm whitespace-pre-wrap text-gray-900">
        {insights || "Click generate to get AI-based spending analysis."}
      </div>
    </div>
  );
}
