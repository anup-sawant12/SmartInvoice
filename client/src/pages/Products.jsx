import { useState } from "react";

const Products = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Product Management</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Category"
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Price per Kg"
            className="border rounded-lg p-3"
          />
        </div>

        <button className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price (₹/kg)</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-3 text-center" colSpan="4">
                No products found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;