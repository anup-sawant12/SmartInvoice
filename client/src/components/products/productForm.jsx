import { FiX, FiShoppingBag, FiLayers, FiDollarSign } from "react-icons/fi";

const ProductForm = ({
  formData,
  setFormData,
  handleSubmit,
  editing,
  cancelEdit,
  isOpen,
}) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop blur overlay */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
        onClick={cancelEdit}
      />

      {/* Drawer Container */}
      <div
        className={`relative w-full sm:w-[460px] h-full bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out border-l border-neutral-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50/50">
          <div>
            <h2 className="text-xl font-bold text-neutral-800">
              {editing ? "Edit Product Details" : "Add New Product"}
            </h2>
            <p className="text-neutral-500 text-xs mt-1">
              {editing
                ? "Update the current item specifications in your inventory."
                : "Register a new product in your directory database."}
            </p>
          </div>
          <button
            type="button"
            onClick={cancelEdit}
            className="p-2 rounded-xl text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Product Name
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <FiShoppingBag className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Basmati Rice, Apple, Mango"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Category Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Category
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <FiLayers className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Grains, Fruits, Veggies"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
              <p className="text-xs text-neutral-400 italic">
                Grouping products makes generating categorized invoices easier.
              </p>
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">
                Price (Per Kg / Item)
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <FiDollarSign className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 flex items-center gap-3">
            <button
              type="button"
              onClick={cancelEdit}
              className="flex-1 py-3 px-4 bg-white border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors shadow-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-100"
            >
              {editing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;