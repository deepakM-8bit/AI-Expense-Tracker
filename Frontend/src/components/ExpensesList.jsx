import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth.jsx";

export default function ExpenseList() {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);

  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const fetchExpenses = () => {
    axios
      .get("http://localhost:3000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setExpenses(res.data));
  };

  useEffect(() => {
    fetchExpenses();
    window.addEventListener("expenseUpdated", fetchExpenses);
    return () =>
      window.removeEventListener("expenseUpdated", fetchExpenses);
  }, []);

  // Open modal with selected expense data
  const openEditModal = (exp) => {
    setSelectedExpense({ ...exp });
    setEditModalOpen(true);
  };

  // Handle input change in modal
  const handleEditChange = (e) =>
    setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });

  // Save updated expense
  const saveEdit = async () => {
    await axios.put(
      `http://localhost:3000/api/expenses/${selectedExpense.id}`,
      selectedExpense,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setEditModalOpen(false);
    fetchExpenses();
  };

  // Delete expense
  const deleteExpense = async () => {
    await axios.delete(
      `http://localhost:3000/api/expenses/${selectedExpense.id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setDeleteConfirmOpen(false);
    fetchExpenses();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-10">
      <h3 className="text-xl font-semibold mb-4">Your Expenses</h3>

      <div className="space-y-4">
        {expenses.map((e) => (
          <div
            key={e.id}
            className="p-4 border rounded-xl flex flex-col md:flex-row justify-between gap-2"
          >
            <div>
              <p className="font-semibold text-lg">{e.title}</p>
              <p className="text-gray-500 text-sm">Category: {e.category}</p>
              <p className="text-gray-500 text-sm">
                Date: {new Date(e.date).toLocaleDateString()}
              </p>

              {e.note && (
                <p className="text-gray-700 text-sm mt-1">Note: {e.note}</p>
              )}

              {e.recurring !== "none" && (
                <span className="mt-2 inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                  {e.recurring.toUpperCase()} RECURRING
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
                onClick={() => openEditModal(e)}
              >
                Edit
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                onClick={() => {
                  setSelectedExpense(e);
                  setDeleteConfirmOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* EDIT MODAL */}
{editModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
    <div className="bg-white p-8 rounded-2xl w-[90%] max-w-lg shadow-lg animate-fadeIn">

      <h3 className="text-xl font-bold mb-6">Edit Expense</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Full width Title */}
        <input
          name="title"
          value={selectedExpense.title}
          onChange={handleEditChange}
          className="p-3 border rounded-xl md:col-span-2"
          placeholder="Title"
        />

        {/* Amount */}
        <input
          name="amount"
          type="number"
          value={selectedExpense.amount}
          onChange={handleEditChange}
          className="p-3 border rounded-xl"
          placeholder="Amount"
        />

        {/* Category */}
        <select
          name="category"
          value={selectedExpense.category}
          onChange={handleEditChange}
          className="p-3 border rounded-xl"
        >
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Transportation">Transportation</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills & Utilities">Bills & Utilities</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Groceries">Groceries</option>
          <option value="Education">Education</option>
          <option value="Investments">Investments</option>
          <option value="Rent">Rent</option>
          <option value="EMIs">EMIs</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Others">Others</option>
        </select>

        {/* Date */}
        <input
          name="date"
          type="date"
          value={selectedExpense.date.split("T")[0]}
          onChange={handleEditChange}
          className="p-3 border rounded-xl"
        />

        {/* Recurring */}
        <select
          name="recurring"
          value={selectedExpense.recurring}
          onChange={handleEditChange}
          className="p-3 border rounded-xl"
        >
          <option value="none">Not Recurring</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        {/* Full width Note */}
        <textarea
          name="note"
          value={selectedExpense.note}
          onChange={handleEditChange}
          className="p-3 border rounded-xl md:col-span-2"
          placeholder="Note"
        ></textarea>

      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-xl"
          onClick={() => setEditModalOpen(false)}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
          onClick={saveEdit}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}


      {/* DELETE CONFIRM MODAL */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-lg animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">Delete Expense?</h3>
            <p className="text-gray-600">
              Are you sure you want to delete <b>{selectedExpense.title}</b>?
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded-xl"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-xl"
                onClick={deleteExpense}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
