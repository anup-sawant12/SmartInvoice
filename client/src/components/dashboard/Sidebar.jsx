import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContex";
import toast from "react-hot-toast";
import { 
  FiHome, 
  FiFilePlus, 
  FiBox, 
  FiFileText, 
  FiShoppingBag, 
  FiBarChart2, 
  FiSettings, 
  FiLogOut,
  FiX
} from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "New Invoice", path: "/invoice", icon: FiFilePlus, primary: true },
    { name: "Products", path: "/products", icon: FiBox },
    { name: "Invoices", path: "/invoices", icon: FiFileText },
    { name: "Shop Profile", path: "/shop", icon: FiShoppingBag },
    { name: "Reports", path: "/reports", icon: FiBarChart2 },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-neutral-200 transition-transform duration-300 lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-100">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-neutral-800" onClick={() => setIsOpen(false)}>
            <span className="text-blue-600 font-extrabold">Smart</span>Invoice
          </Link>
          <button 
            className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            if (item.primary) {
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all shadow-sm
                    ${isActive 
                      ? "bg-blue-600 text-white shadow-blue-100" 
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all
                  ${isActive 
                    ? "bg-neutral-100 text-neutral-900" 
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-neutral-100">
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-neutral-500 hover:text-red-600 rounded-xl hover:bg-red-50 font-medium text-sm transition-all"
          >
            <FiLogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
