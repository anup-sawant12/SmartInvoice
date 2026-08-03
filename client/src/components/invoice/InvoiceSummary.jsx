import { useEffect } from "react";

const InvoiceSummary = ({ invoice, setInvoice }) => {
  useEffect(() => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const grandTotal = subtotal - Number(invoice.discount) + Number(invoice.gst);

    setInvoice((prev) => ({
      ...prev,
      subtotal,
      grandTotal,
    }));
  }, [invoice.items, invoice.discount, invoice.gst, setInvoice]);

  const handleChange = (e) => {
    setInvoice((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value) || 0,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">
        Invoice Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{invoice.subtotal.toFixed(2)}</span>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Discount
          </label>

          <input
            type="number"
            name="discount"
            value={invoice.discount}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            GST
          </label>

          <input
            type="number"
            name="gst"
            value={invoice.gst}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Grand Total</span>
          <span>₹{invoice.grandTotal.toFixed(2)}</span>
        </div>

      </div>
    </div>
  );
};

export default InvoiceSummary;