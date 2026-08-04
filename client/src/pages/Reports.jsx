import { FiBarChart2, FiDownload, FiTrendingUp, FiPieChart } from "react-icons/fi";
import toast from "react-hot-toast";

const Reports = () => {
  const handleExport = (reportName) => {
    toast.success(`${reportName} exported successfully!`);
  };

  const reportModules = [
    {
      title: "Sales Report",
      desc: "Detailed summary of sales by product, customer, and date ranges.",
      icon: FiTrendingUp,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Tax & GST Report",
      desc: "Aggregated reports outlining collectable GST taxes for standard filings.",
      icon: FiBarChart2,
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Product Performance",
      desc: "Analytics detailing top performing products and sales margins.",
      icon: FiPieChart,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">Reports & Analytics</h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Export and analyze your store sales, tax collections, and performance logs.
        </p>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportModules.map((rep, idx) => {
          const Icon = rep.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between h-56">
              <div>
                <div className={`p-2.5 rounded-xl w-fit ${rep.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-neutral-800 mt-4">{rep.title}</h3>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">{rep.desc}</p>
              </div>
              <button
                onClick={() => handleExport(rep.title)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-xs font-semibold text-neutral-700 transition-colors mt-4"
              >
                <FiDownload className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;
