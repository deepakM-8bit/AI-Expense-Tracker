import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";

export default function ExpenseList() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    axios
      .get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setExpenses(res.data));
  };

  useEffect(() => {
    fetchExpenses();
    window.addEventListener("expenseUpdated", fetchExpenses);
    return () => window.removeEventListener("expenseUpdated", fetchExpenses);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-4">Your Expenses</h3>

      <div className="space-y-4">
        {expenses.map((e) => (
          <div
            key={e.id}
            className="p-4 border rounded-xl flex flex-col md:flex-row justify-between gap-2"
          >
            <div>
              <p className="font-semibold text-lg">{e.title}</p>
              <p className="text-gray-500 text-sm">
                Category: {e.category}
              </p>
              <p className="text-gray-500 text-sm">
                Date: {new Date(e.date).toLocaleDateString()}
              </p>

              {e.note && (
                <p className="text-gray-700 text-sm mt-1">
                  Note: {e.note}
                </p>
              )}

              {e.recurring !== "none" && (
                <span className="mt-2 inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                  {e.recurring.toUpperCase()} RECURRING
                </span>
              )}
            </div>

            <div className="text-right">
              <p className="text-blue-600 text-xl font-bold">
                ₹{e.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
