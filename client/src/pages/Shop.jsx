import { useEffect, useState } from "react";
import { createShop, getShop, updateShop } from "../services/shopService";
import toast from "react-hot-toast";

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
    }
  };

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await getShop();

        setFormData({
          shopName: res.data.shopName,
          address: res.data.address,
          mobile: res.data.mobile,
          gstNumber: res.data.gstNumber,
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

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">
          Shop Profile
        </h1>
        <p className="text-neutral-500 mt-1 text-sm">
          Configure your shop information and branding details.
        </p>
      </div>

      <div className="bg-white shadow-sm border border-neutral-200 rounded-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-sm text-neutral-700">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Enter Shop Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm text-neutral-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-sm"
              rows="3"
              placeholder="Enter Address"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm text-neutral-700">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm text-neutral-700">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-full border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Enter GST Number"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-sm text-neutral-700">Shop Logo</label>

            {preview && (
              <img
                src={preview}
                alt="Shop Logo"
                className="h-28 w-28 object-cover rounded-lg border border-neutral-200 mb-3"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-sm shadow-blue-100"
          >
            {isEdit ? "Update Shop" : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shop;