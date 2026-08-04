import { Link } from "react-router-dom";
import { FiPlusCircle, FiFileText, FiShoppingBag, FiPlus } from "react-icons/fi";

const QuickActions = () => {
  const actions = [
    {
      title: "Create New Invoice",
      icon: FiPlus,
      path: "/invoice",
      color: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-100",
    },
    {
      title: "Add Product",
      icon: FiPlusCircle,
      path: "/products",
      color: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/50",
    },
    {
      title: "View Invoices",
      icon: FiFileText,
      path: "/invoices",
      color: "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200",
    },
    {
      title: "Shop Profile",
      icon: FiShoppingBag,
      path: "/shop",
      color: "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm h-full flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-neutral-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, idx) => (
            <Link
              key={idx}
              to={action.path}
              className={`flex flex-col items-center justify-center text-center p-3 rounded-xl font-semibold text-xs transition-all gap-1.5 h-24 ${action.color}`}
            >
              <action.icon className="w-5 h-5 flex-shrink-0" />
              <span>{action.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
