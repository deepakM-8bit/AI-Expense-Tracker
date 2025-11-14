import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm py-4 px-10 flex justify-between items-center z-20">
      <h1 className="text-2xl font-bold">AI Expense Tracker</h1>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setOpenProfile(!openProfile)}
          className="font-medium hover:text-blue-600"
        >
          {user?.name || "Profile"}
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {openProfile && (
        <div className="absolute top-16 right-10 bg-white shadow-lg p-6 rounded-xl w-60">
          <p className="font-semibold text-lg">{user?.name}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      )}
    </nav>
  );
}
