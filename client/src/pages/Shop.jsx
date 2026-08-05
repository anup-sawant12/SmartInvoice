import { useEffect, useState } from "react";
import { createShop, getShop, updateShop } from "../services/shopService";
import toast from "react-hot-toast";
import {
  FiShoppingBag,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiAward,
} from "react-icons/fi";

const Shop = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    mobile: "",
    gstNumber: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("shopName", formData.shopName);
      data.append("address", formData.address);
      data.append("mobile", formData.mobile);
      data.append("gstNumber", formData.gstNumber);

      if (logo) {
        data.append("logo", logo);
      }

      if (isEdit) {
        await updateShop(data);
        toast.success("Shop updated successfully");
      } else {
        await createShop(data);
        toast.success("Shop created successfully");
        setIsEdit(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await getShop();
        setFormData({
          shopName: res.data.shopName || "",
          address: res.data.address || "",
          mobile: res.data.mobile || "",
          gstNumber: res.data.gstNumber || "",
        });

        if (res.data.logo) {
          setPreview(res.data.logo);
        }
        setIsEdit(true);
      } catch (error) {
        console.log("No shop found");
      }
    };

    fetchShop();
  }, []);

  // Compute profile completeness checklist items
  const checklist = [
    { label: "Shop Name Set", value: !!formData.shopName },
    { label: "Contact Details Configured", value: !!formData.mobile },
    { label: "Billing Address Configured", value: !!formData.address },
    { label: "GST Details Registered", value: !!formData.gstNumber, optional: true },
    { label: "Branding Logo Uploaded", value: !!preview },
  ];

  const completedCount = checklist.filter((item) => item.value).length;
  const percentComplete = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      {/* Header Info */}
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">
          Shop Profile Settings
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Customize your business identity, contact details, and invoice branding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Branding Identity Profile */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm flex flex-col items-center space-y-6">
          <div className="w-full text-center pb-4 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-800 text-lg">Branding & Logo</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Customize your invoice brand logo</p>
          </div>

          {/* Interactive Logo Container */}
          <div className="relative group w-36 h-36 rounded-2xl border-2 border-dashed border-neutral-200 hover:border-blue-500 transition-all flex items-center justify-center overflow-hidden bg-neutral-50/50 cursor-pointer">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Shop Logo Preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1.5 p-3">
                  <FiUploadCloud className="w-5 h-5 animate-bounce" />
                  <span className="text-[10px] font-bold tracking-wide">CHANGE LOGO</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center text-neutral-400">
                <FiUploadCloud className="w-7 h-7 mb-2 text-neutral-300 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs font-bold text-neutral-600">Upload Logo</span>
                <span className="text-[9px] text-neutral-450 mt-0.5">JPG, PNG up to 2MB</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Status Display Card */}
          <div className="w-full bg-neutral-50 rounded-xl p-4 border border-neutral-150 space-y-3.5">
            <div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-500 uppercase tracking-wider">Setup Progress</span>
                <span className="font-bold text-neutral-800">{percentComplete}%</span>
              </div>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  {item.value ? (
                    <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <FiAlertCircle
                      className={`w-4 h-4 flex-shrink-0 ${
                        item.optional ? "text-neutral-300" : "text-amber-500"
                      }`}
                    />
                  )}
                  <span
                    className={`font-medium ${
                      item.value
                        ? "text-neutral-600 line-through decoration-neutral-350"
                        : "text-neutral-550"
                    }`}
                  >
                    {item.label}
                    {item.optional && <span className="text-[10px] text-neutral-400 ml-1">(Optional)</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Settings Form Fields */}
        <div className="lg:col-span-2 bg-white border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Section 1: Business Identity */}
            <div className="space-y-4">
              <div className="border-b border-neutral-100 pb-2 flex items-center gap-2">
                <FiAward className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-neutral-850 text-sm">Business Identity</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Shop Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    Official Shop Name
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <FiShoppingBag className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold"
                      placeholder="e.g. Acme Stores Ltd."
                      required
                    />
                  </div>
                </div>

                {/* Tax ID GST Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    GST / Tax ID Number
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <FiFileText className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="e.g. 22AAAAA0000A1Z5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section 2: Contact Information */}
            <div className="space-y-4">
              <div className="border-b border-neutral-100 pb-2 flex items-center gap-2">
                <FiPhone className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-neutral-850 text-sm">Contact Information</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Mobile Number Input */}
                <div className="md:col-span-1 space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <FiPhone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="e.g. +91 98765 43210"
                      required
                    />
                  </div>
                </div>

                {/* Street Address Text Area */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    Business Address
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 pt-3.5 flex items-start pointer-events-none text-neutral-400">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      rows="3"
                      placeholder="Street name, landmark, City, State, ZIP code"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-100 disabled:bg-blue-400 active:scale-98 cursor-pointer w-full sm:w-auto min-w-[140px]"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : isEdit ? (
                  "Update Settings"
                ) : (
                  "Create Shop Settings"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shop;