import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiBox, FiLayers, FiDollarSign, FiAward, FiPlus } from "react-icons/fi";

import ProductForm from "../components/products/productForm";
import ProductTable from "../components/products/productTable";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateProduct(editingId, formData);
        toast.success("Product Updated Successfully");
      } else {
        await createProduct(formData);
        toast.success("Product Added Successfully");
      }

      setFormData({
        name: "",
        category: "",
        price: "",
      });

      setEditing(false);
      setEditingId(null);
      setIsDrawerOpen(false);

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleEdit = (product) => {
    setEditing(true);
    setEditingId(product.id);

    setFormData({
      name: product.name,
      category: product.category || "",
      price: product.price,
    });
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      toast.success("Product Deleted Successfully");
      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  };

  const handleAddClick = () => {
    setEditing(false);
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      price: "",
    });
    setIsDrawerOpen(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      price: "",
    });
    setIsDrawerOpen(false);
  };

  // Metrics calculations
  const totalProducts = products.length;
  const uniqueCategories = new Set(
    products.map((p) => p.category?.trim().toLowerCase()).filter(Boolean)
  ).size;
  const avgPrice = products.length
    ? products.reduce((sum, p) => sum + Number(p.price || 0), 0) / products.length
    : 0;
  const maxPrice = products.length
    ? Math.max(...products.map((p) => Number(p.price || 0)))
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">
            Products Directory
          </h1>
          <p className="text-neutral-500 mt-1 text-sm">
            Add, update, and categorize your inventory items.
          </p>
        </div>
        <div>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-blue-100 active:scale-95 cursor-pointer text-sm"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FiBox className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl font-bold text-neutral-800 mt-0.5">{totalProducts}</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <FiLayers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Categories</p>
            <h3 className="text-2xl font-bold text-neutral-800 mt-0.5">{uniqueCategories}</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <FiDollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Avg Price (₹/kg)</p>
            <h3 className="text-2xl font-bold text-neutral-800 mt-0.5">
              ₹{avgPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <FiAward className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Max Price</p>
            <h3 className="text-2xl font-bold text-neutral-800 mt-0.5">
              ₹{maxPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Directory Table */}
      <ProductTable
        products={products}
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddClick={handleAddClick}
      />

      {/* Sliding Edit/Add Form Drawer */}
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editing={editing}
        cancelEdit={cancelEdit}
        isOpen={isDrawerOpen}
      />
    </div>
  );
};

export default Products;