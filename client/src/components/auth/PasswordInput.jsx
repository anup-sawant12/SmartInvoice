import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({ label, id, error, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          {...props}
          className={`
            w-full border rounded-xl pl-3 pr-10 py-3 text-sm transition-all focus:outline-none bg-neutral-50 focus:bg-white
            ${error 
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 bg-red-50/10" 
              : "border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            }
          `}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
        >
          {show ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600 font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
