const ProductTable = ({
  products,
  search,
  setSearch,
  onEdit,
  onDelete,
}) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price (₹/kg)</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center p-6 text-gray-500"
              >
                No Products Found
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{product.name}</td>

                <td className="p-3">
                  {product.category || "-"}
                </td>

                <td className="p-3">
                  ₹{product.price}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;