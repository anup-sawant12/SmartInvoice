import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShop } from "../../services/shopService";
import { FiMenu, FiBell, FiChevronDown, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { useAuth } from "../../context/authContex";
import toast from "react-hot-toast";

const Topbar = ({ onMenuButtonClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [shop, setShop] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await getShop();
        if (res.data) {
          setShop(res.data);
        }
      } catch (err) {
        console.log("No shop profile configured yet");
      }
    };
    fetchShop();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/invoice":
        return "New Invoice";
      case "/products":
        return "Products";
      case "/invoices":
        return "Invoices";
      case "/shop":
        return "Shop Profile";
      case "/reports":
        return "Reports";
      case "/settings":
        return "Settings";
      default:
        return "SmartInvoice";
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-neutral-200 z-30">
      {/* Left side: Hamburger (mobile) + Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuButtonClick}
          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 lg:hidden focus:outline-none"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-neutral-800">
          <span className="text-neutral-400 font-normal">App</span>
          <span className="text-neutral-300">/</span>
          <span>{getPageTitle(location.pathname)}</span>
        </div>
      </div>

      {/* Right side: Notifications + Shop Info */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 relative focus:outline-none">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-neutral-200"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 md:gap-3 p-1 rounded-lg hover:bg-neutral-50 focus:outline-none text-left"
          >
            {shop?.logo ? (
              <img
                src={shop.logo}
                alt="Shop Logo"
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                {shop?.shopName ? shop.shopName.charAt(0).toUpperCase() : "S"}
              </div>
            )}
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-neutral-800 leading-tight">
                {shop?.shopName || "My Shop"}
              </p>
              <p className="text-xs text-neutral-500 leading-none mt-0.5">Shop Owner</p>
            </div>
            <FiChevronDown className="w-4 h-4 text-neutral-400 hidden md:block" />
          </button>

          {dropdownOpen && (
            <>
              {/* Overlay to close dropdown */}
              <div
                className="fixed inset-0 z-45"
                onClick={() => setDropdownOpen(false)}
              ></div>

              <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 py-1.5">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/shop");
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <FiUser className="w-4 h-4 text-neutral-400" />
                  <span>Shop Profile</span>
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/settings");
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <FiSettings className="w-4 h-4 text-neutral-400" />
                  <span>Settings</span>
                </button>
                <div className="border-t border-neutral-100 my-1"></div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FiLogOut className="w-4 h-4 text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
