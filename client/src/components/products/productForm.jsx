const ProductForm = ({
  formData,
  setFormData,
  handleSubmit,
  editing,
  cancelEdit,
}) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editing ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price per Kg"
          value={formData.price}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {editing ? "Update Product" : "Add Product"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;