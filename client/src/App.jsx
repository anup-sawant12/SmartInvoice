import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Shop from "./pages/Shop.jsx";
import Products from "./pages/Products";
import Invoice from "./pages/Invoice";

import ProtectedRoute from "./routes/protectRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />

      <Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>

<Route
  path="/invoice"
  element={
    <ProtectedRoute>
      <Invoice />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;