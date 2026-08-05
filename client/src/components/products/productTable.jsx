import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiInbox, FiFilter } from "react-icons/fi";

const ProductTable = ({
  products,
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  onEdit,
  onDelete,
  onAddClick,
}) => {
  // Get unique categories for the filter dropdown
  const categories = Array.from(
    new Set(
      products
        .map((p) => p.category?.trim())
        .filter(Boolean)
    )
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category?.trim().toLowerCase() === categoryFilter.trim().toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const getInitials = (name) => {
    if (!name) return "P";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarStyle = (name) => {
    const charCode = name ? name.charCodeAt(0) : 0;
    const colors = [
      "bg-blue-50 text-blue-600 border-blue-100",
      "bg-purple-50 text-purple-600 border-purple-100",
      "bg-emerald-50 text-emerald-600 border-emerald-100",
      "bg-amber-50 text-amber-600 border-amber-100",
      "bg-rose-50 text-rose-600 border-rose-100",
      "bg-indigo-50 text-indigo-600 border-indigo-100",
    ];
    return colors[charCode % colors.length];
  };

  const getCategoryBadgeStyle = (category) => {
    if (!category) return "bg-neutral-50 text-neutral-400 border-neutral-200/50";
    const charCode = category.charCodeAt(0) + (category.charCodeAt(1) || 0);
    const badges = [
      "bg-blue-50/80 text-blue-700 border-blue-100/50",
      "bg-emerald-50/80 text-emerald-700 border-emerald-100/50",
      "bg-purple-50/80 text-purple-700 border-purple-100/50",
      "bg-amber-50/80 text-amber-700 border-amber-100/50",
      "bg-rose-50/80 text-rose-700 border-rose-100/50",
      "bg-indigo-50/80 text-indigo-700 border-indigo-100/50",
    ];
    return badges[charCode % badges.length];
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-150 shadow-sm overflow-hidden transition-all duration-200">
      {/* Directory Filters Header */}
      <div className="p-5 border-b border-neutral-100 bg-neutral-50/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-800 self-start sm:self-center">
          All Products
        </h2>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <FiSearch className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Selector */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <FiFilter className="w-4 h-4" />
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-600 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Custom select chevron */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Table View */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/50">
              <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-6">
                Product Details
              </th>
              <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Category
              </th>
              <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right pr-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-16 pl-6 pr-6">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="p-4 bg-neutral-50 rounded-2xl text-neutral-400 mb-4 border border-neutral-100">
                      <FiInbox className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-bold text-neutral-800">
                      No Products Found
                    </h4>
                    <p className="text-neutral-500 text-xs text-center mt-1.5 leading-relaxed">
                      {products.length === 0
                        ? "You haven't added any products to your catalog yet. Get started by inserting your first item."
                        : "No matching products were found with the applied filters. Try adjusting your search query."}
                    </p>
                    {products.length === 0 && (
                      <button
                        onClick={onAddClick}
                        className="mt-5 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                        <span>Add Product</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-neutral-50/60 transition-colors group"
                >
                  {/* Name column with avatar */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border ${getAvatarStyle(
                          product.name
                        )}`}
                      >
                        {getInitials(product.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </p>
                        <span className="text-[11px] text-neutral-400">ID: {product.id.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </td>

                  {/* Category badging */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeStyle(
                        product.category
                      )}`}
                    >
                      {product.category || "Unassigned"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <p className="text-sm font-bold text-neutral-700">
                      ₹{Number(product.price).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Per Kg / Unit</span>
                  </td>

                  {/* Actions column */}
                  <td className="p-4 text-right pr-6">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onEdit(product)}
                        title="Edit Item"
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete(product.id)}
                        title="Delete Item"
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;