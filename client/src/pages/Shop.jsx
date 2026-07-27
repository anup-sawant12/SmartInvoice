import { useEffect, useState } from "react";
import { createShop, getShop, updateShop } from "../services/shopService";

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
        alert("Shop updated successfully");
      } else {
        await createShop(data);
        alert("Shop created successfully");
        setIsEdit(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Shop Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Shop Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Enter Address"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Enter GST Number"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Shop Logo</label>

            {preview && (
              <img
                src={preview}
                alt="Shop Logo"
                className="h-28 w-28 object-cover rounded-lg border mb-3"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {isEdit ? "Update Shop" : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shop;