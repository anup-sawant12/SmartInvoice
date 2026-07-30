import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

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

  const cancelEdit = () => {
    setEditing(false);
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      price: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Product Management
      </h1>

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editing={editing}
        cancelEdit={cancelEdit}
      />

      <ProductTable
        products={products}
        search={search}
        setSearch={setSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Products;