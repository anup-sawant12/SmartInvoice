import { Link } from "react-router-dom";
import { FiArrowRight, FiEye } from "react-icons/fi";

const RecentInvoices = ({ invoices }) => {
  // Use real invoices if they exist, otherwise show placeholders
  const displayInvoices = invoices && invoices.length > 0
    ? invoices.slice(0, 5).map(inv => ({
        id: inv.id,
        invoiceNumber: inv.invoiceNumber,
        customer: inv.customerName || "Walk-in Customer",
        date: new Date(inv.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        amount: `₹${Number(inv.grandTotal).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        status: "Paid"
      }))
    : [
        { id: "1", invoiceNumber: "INV-001", customer: "Rahul", date: "Today", amount: "₹850.00", status: "Paid" },
        { id: "2", invoiceNumber: "INV-002", customer: "Amit", date: "Today", amount: "₹1,250.00", status: "Paid" },
        { id: "3", invoiceNumber: "INV-003", customer: "Vikram", date: "Yesterday", amount: "₹450.00", status: "Paid" },
        { id: "4", invoiceNumber: "INV-004", customer: "Sanjay", date: "Aug 3, 2026", amount: "₹2,100.00", status: "Paid" },
      ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-800">Recent Invoices</h2>
        <Link to="/invoices" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          <span>View All</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-neutral-100 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Invoice Number</th>
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {displayInvoices.map((inv) => (
              <tr key={inv.id} className="text-sm text-neutral-700 hover:bg-neutral-50/50 transition-colors">
                <td className="py-3.5 font-semibold text-neutral-800">{inv.invoiceNumber}</td>
                <td className="py-3.5">{inv.customer}</td>
                <td className="py-3.5">{inv.date}</td>
                <td className="py-3.5 font-medium text-neutral-900">{inv.amount}</td>
                <td className="py-3.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/40">
                    {inv.status}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <Link
                    to="/invoices"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-600 transition-colors"
                  >
                    <FiEye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInvoices;
