import { FiTrendingUp, FiCalendar } from "react-icons/fi";

const SalesOverview = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-neutral-800">Sales Overview</h2>
          <span className="flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-200/50">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>Weekly</span>
          </span>
        </div>
        <p className="text-xs text-neutral-400">Weekly/monthly sales analytics will appear here.</p>
      </div>

      {/* Polish Placeholder for Chart */}
      <div className="flex-1 min-h-[180px] bg-neutral-50 rounded-xl border border-dashed border-neutral-200 mt-6 flex flex-col items-center justify-center p-6 text-center">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
          <FiTrendingUp className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-neutral-700">Analytics Chart Placeholder</p>
        <p className="text-xs text-neutral-400 mt-1 max-w-[240px]">
          Once more billing data is collected, interactive charts will display your sales trends.
        </p>
      </div>
    </div>
  );
};

export default SalesOverview;
