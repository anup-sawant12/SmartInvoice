const AuthInput = ({ label, id, error, ...props }) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`
          w-full border rounded-xl p-3 text-sm transition-all focus:outline-none bg-neutral-50 focus:bg-white
          ${error 
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 bg-red-50/10" 
            : "border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
          }
        `}
      />
      {error && (
        <p className="text-xs text-red-600 font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default AuthInput;
