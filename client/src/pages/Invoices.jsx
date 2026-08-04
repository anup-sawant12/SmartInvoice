import { useEffect, useState } from "react";
import { getBills, deleteBill } from "../services/billService";
import toast from "react-hot-toast";
import { FiSearch, FiFileText, FiTrash2, FiDownload } from "react-icons/fi";
import { getShop } from "../services/shopService";
import { generateInvoicePDF } from "../utils/pdfGenerator";

const Invoices = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState(null);

  const fetchBillsAndShop = async () => {
    try {
      const [billsRes, shopRes] = await Promise.all([
        getBills().catch(() => ({ data: [] })),
        getShop().catch(() => ({ data: null }))
      ]);
      setBills(billsRes.data || []);
      setShop(shopRes.data);
    } catch (error) {
      toast.error("Failed to load invoice history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillsAndShop();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await deleteBill(id);
      toast.success("Invoice deleted successfully");
      fetchBillsAndShop();
    } catch (err) {
      toast.error("Failed to delete invoice");
    }
  };

  const handleDownloadPDF = (bill) => {
    try {
      const billDataForPDF = {
        ...bill,
        items: bill.billItems.map(item => ({
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        }))
      };
      generateInvoicePDF(billDataForPDF, shop);
      toast.success("PDF Downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    }
  };

  const filteredBills = bills.filter((b) =>
    (b.invoiceNumber?.toLowerCase().includes(search.toLowerCase())) ||
    (b.customerName?.toLowerCase().includes(search.toLowerCase())) ||
    (b.customerMobile?.includes(search))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">Invoices</h1>
          <p className="text-neutral-500 mt-1 text-sm">
            View, download, and manage your billing invoices.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search invoice, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-blue-500 text-sm bg-white"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading invoices...</div>
        ) : filteredBills.length === 0 ? (
          <div className="p-12 text-center max-w-sm mx-auto flex flex-col items-center">
            <div className="p-4 bg-neutral-50 text-neutral-400 rounded-full mb-4">
              <FiFileText className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-neutral-800">No invoices found</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Create a new invoice from the sidebar or click "New Invoice".
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 text-xs font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-50/50">
                  <th className="px-6 py-4 font-semibold">Invoice Number</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="text-sm text-neutral-700 hover:bg-neutral-50/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-neutral-800">{bill.invoiceNumber}</td>
                    <td className="px-6 py-4">{bill.customerName || "Walk-in Customer"}</td>
                    <td className="px-6 py-4 text-neutral-500">{bill.customerMobile || "-"}</td>
                    <td className="px-6 py-4">
                      {new Date(bill.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 font-semibold text-neutral-900">
                      ₹{Number(bill.grandTotal).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDownloadPDF(bill)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-600 transition-colors"
                        title="Download PDF"
                      >
                        <FiDownload className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => handleDelete(bill.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Invoice"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
