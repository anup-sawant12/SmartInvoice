import { useAuth } from "../context/authContex.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to SmartInvoice
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Shop Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

        <button
  onClick={() => navigate("/products")}
  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>
  Products
</button>
      </div>
    </div>
  );
};

export default Dashboard;