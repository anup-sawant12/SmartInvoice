import { FiSettings, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

const Settings = () => {
  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">Settings</h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Manage your application preferences, profile parameters, and defaults.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm max-w-2xl overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <FiSettings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-800">General Settings</h2>
            <p className="text-xs text-neutral-400">Configure global configurations for SmartInvoice.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Currency Symbol</label>
              <input
                type="text"
                defaultValue="₹ (INR)"
                className="w-full border rounded-xl p-3 bg-neutral-50 text-neutral-500 text-sm focus:outline-none cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block mb-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Default Tax Rate (GST %)</label>
              <input
                type="number"
                defaultValue="18"
                className="w-full border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Invoice Terms & Conditions</label>
            <textarea
              defaultValue="Thank you for shopping with us. Goods once sold cannot be returned or exchanged."
              rows="3"
              className="w-full border border-neutral-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="border-t border-neutral-100 pt-5 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-sm shadow-blue-100"
            >
              <FiCheck className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
