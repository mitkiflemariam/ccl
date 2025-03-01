import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login"); // Redirect to login if no user is logged in
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="flex items-center text-black justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
          <h2 className="text-2xl font-bold">Welcome, {user?.fName}!</h2>
          <button
            onClick={() => {
              localStorage.removeItem("loggedInUser"); // Clear session
              navigate("/login"); // Redirect to login
            }}
            className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
