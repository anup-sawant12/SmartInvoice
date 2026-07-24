import { useState } from "react";
import { login } from "../services/authService.js";
import { useAuth } from "../context/authContex.jsx";



const Login = () => {

     const { login: saveToken } = useAuth();



  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await login(formData);

    console.log(res.data);

   saveToken(res.data.data.token);

    alert("Login Successful!");
  } catch (error) {
    console.error(error.response?.data || error.message);

    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/" className="text-blue-600 font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;