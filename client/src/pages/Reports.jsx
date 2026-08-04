import { FiTool } from "react-icons/fi";

const Reports = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-5 rounded-full">
            <FiTool className="text-4xl text-blue-600" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">
          Under Maintenance
        </h1>

        <p className="text-neutral-500 mt-3">
          Reports are currently under development.
        </p>

        <p className="text-neutral-400 text-sm mt-1">
          This feature will be available soon.
        </p>
      </div>
    </div>
  );
};

export default Reports;