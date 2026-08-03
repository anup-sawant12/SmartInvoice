const InvoicePreview = ({ invoice, shop, onSave, isSaving }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 sticky top-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Invoice Preview
      </h2>

      <div className="mb-4 text-sm text-gray-600">
        <h3 className="font-bold text-lg text-gray-800">
          {shop?.shopName || "SmartInvoice"}
        </h3>

        <p>{shop?.address || "Your Shop Address"}</p>
        <p>{shop?.mobile || "9876543210"}</p>
        {shop?.gstNumber && <p>GST: {shop.gstNumber}</p>}
      </div>

      <hr className="my-4" />

      <div className="mb-4">
        <p>
          <strong>Customer:</strong>{" "}
          {invoice.customerName || "-"}
        </p>

        <p>
          <strong>Mobile:</strong>{" "}
          {invoice.customerMobile || "-"}
        </p>
      </div>

      <hr className="my-4" />

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Product</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="text-center py-4 text-gray-500"
              >
                No Items Added
              </td>
            </tr>
          ) : (
            invoice.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">
                  {item.productName}
                </td>

                <td className="text-center">
                  {item.quantity} g
                </td>

                <td className="text-right">
                  ₹{item.total.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <hr className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>
            ₹{invoice.subtotal?.toFixed(2) || "0.00"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span>
            ₹{invoice.discount?.toFixed(2) || "0.00"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST</span>

          <span>
            ₹{invoice.gst?.toFixed(2) || "0.00"}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Grand Total</span>

          <span>
            ₹{invoice.grandTotal?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>

      <button
        onClick={onSave}
        disabled={isSaving || invoice.items.length === 0}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
      >
        {isSaving ? "Saving..." : "Save Invoice"}
      </button>
    </div>
  );
};

export default InvoicePreview;