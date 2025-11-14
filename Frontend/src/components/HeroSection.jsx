import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HeroSection() {
  const { user, token } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:3000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setSummary(res.data))
      .catch(() => {});
  }, [token]);

  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold">
        Hey {user?.name} 👋
      </h2>
      <p className="text-gray-600 mt-2">
        Here's your expense overview for this week.
      </p>

      <div className="mt-6 bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between text-center">
        <div>
          <p className="text-gray-500">Total Spent This Week</p>
          <h3 className="text-2xl font-semibold text-blue-600">
            ₹{summary?.weekTotal || 0}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Total This Month</p>
          <h3 className="text-2xl font-semibold text-green-600">
            ₹{summary?.monthTotal || 0}
          </h3>
        </div>
      </div>
    </section>
  );
}
