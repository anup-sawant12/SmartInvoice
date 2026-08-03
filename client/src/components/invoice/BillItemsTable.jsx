const BillItemsTable = ({ invoice, setInvoice }) => {
  const handleDelete = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);

    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">
        Bill Items
      </h2>

      {invoice.items.length === 0 ? (
        <p className="text-gray-500">
          No products added yet.
        </p>
      ) : (
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Qty (kg)</th>
              <th className="p-3">Rate/kg</th>
              <th className="p-3">Total</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item, index) => (
              <tr
                key={index}
                className="border-b text-center"
              >
                <td className="p-3">
                  {item.productName}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  ₹{item.price}
                </td>

                <td className="p-3">
                  ₹{item.total.toFixed(2)}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillItemsTable;