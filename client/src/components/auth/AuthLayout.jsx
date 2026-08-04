import { Link } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex bg-neutral-50 font-sans">
      {/* Left side: branding/illustration (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-1/4 -right-12 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 -left-12 w-64 h-64 bg-blue-700 rounded-full blur-3xl opacity-50"></div>

        {/* Branding header */}
        <div className="z-10">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-white font-extrabold">Smart</span>Invoice
          </Link>
        </div>

        {/* Short headline & Product description */}
        <div className="my-auto z-10 max-w-md space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            Simple billing.<br />Smarter business.
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            Create professional invoices, manage products, and track your business from one place.
          </p>

          {/* Billing abstract UI illustration */}
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <FiTrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="h-3 w-20 bg-white/30 rounded-md"></div>
                  <div className="h-2 w-12 bg-white/20 rounded-md mt-1.5"></div>
                </div>
              </div>
              <div className="h-4 w-16 bg-white/30 rounded-md"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-full bg-white/20 rounded-md"></div>
              <div className="h-2.5 w-3/4 bg-white/20 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="z-10 text-xs text-blue-200">
          © {new Date().getFullYear()} SmartInvoice. All rights reserved.
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-neutral-50 lg:bg-white">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-neutral-800">
              <span className="text-blue-600 font-extrabold">Smart</span>Invoice
            </Link>
          </div>

          {/* Title Header */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-neutral-500">
              {subtitle}
            </p>
          </div>

          {/* Form wrapper */}
          <div className="bg-white lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-neutral-200/60 lg:border-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
