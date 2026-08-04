const StatCard = ({ icon: Icon, label, value, colorClass = "text-blue-600 bg-blue-50" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">{label}</p>
        <p className="text-2xl font-bold text-neutral-800 mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StatCard;
