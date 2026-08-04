import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/authContex";
import toast from "react-hot-toast";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login: saveToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear errors when typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await login(formData);
      saveToken(res.data.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue to SmartInvoice">
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <PasswordInput
          label="Password"
          id="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
          <label className="flex items-center gap-2 cursor-pointer text-neutral-600">
            <input
              type="checkbox"
              className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span>Remember me</span>
          </label>
          <a href="#" onClick={(e) => { e.preventDefault(); toast.error("Forgot password flow is not implemented."); }} className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm shadow-blue-100 flex items-center justify-center gap-2"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-neutral-500 mt-4">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;