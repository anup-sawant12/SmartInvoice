import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import toast from "react-hot-toast";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    
    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required";
    }
    
    if (!formData.email) {
      tempErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Send payload without confirmPassword to backend API
      const { name, email, password } = formData;
      const res = await register({ name, email, password });

      console.log(res.data);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start managing your invoices with SmartInvoice">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Full Name"
          id="name"
          name="name"
          type="text"
          placeholder="Anup Sawant"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

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

        <PasswordInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white p-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm shadow-blue-100 flex items-center justify-center gap-2 mt-4"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-neutral-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;