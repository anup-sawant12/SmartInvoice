import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CustomerForm from "../components/invoice/CustomerForm";
import ProductSearch from "../components/invoice/ProductSearch";
import BillItemsTable from "../components/invoice/BillItemsTable";
import InvoiceSummary from "../components/invoice/InvoiceSummary";
import InvoicePreview from "../components/invoice/InvoicePreview";
import { createBill, getNextInvoiceNumber } from "../services/billService";
import { getShop } from "../services/shopService";
import { generateInvoicePDF } from "../utils/pdfGenerator";

const Invoice = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [shop, setShop] = useState(null);
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState("");
  const [invoice, setInvoice] = useState({
    customerName: "",
    customerMobile: "",
    items: [],
    subtotal: 0,
    discount: 0,
    gst: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const fetchLoadData = async () => {
      try {
        const [shopRes, numRes] = await Promise.all([
          getShop(),
          getNextInvoiceNumber(),
        ]);
        setShop(shopRes.data);
        setNextInvoiceNumber(numRes.data);
      } catch (err) {
        console.error("Error loading invoice page data:", err);
      }
    };
    fetchLoadData();
  }, []);

  const handleSave = async () => {
    if (invoice.items.length === 0) {
      toast.error("Please add at least one product.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await createBill(invoice);
      const savedBill = response.data;
      
      toast.success("Invoice created successfully!");
      
      // Generate and download the PDF
      generateInvoicePDF(savedBill, shop);

      // Reset form
      setInvoice({
        customerName: "",
        customerMobile: "",
        items: [],
        subtotal: 0,
        discount: 0,
        gst: 0,
        grandTotal: 0,
      });
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save invoice.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-800 tracking-tight">
            Create Invoice
          </h1>
          <p className="text-neutral-500 mt-1 text-sm">
            Generate new billing invoices and receipts for customers.
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 rounded-xl font-semibold text-sm transition-all shadow-sm w-fit"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-6">
          <CustomerForm
            invoice={invoice}
            setInvoice={setInvoice}
          />

          <ProductSearch
            invoice={invoice}
            setInvoice={setInvoice}
          />

          <BillItemsTable
            invoice={invoice}
            setInvoice={setInvoice}
          />

          <InvoiceSummary
            invoice={invoice}
            setInvoice={setInvoice}
          />
        </div>

        {/* Right */}
        <InvoicePreview 
          invoice={invoice} 
          shop={shop}
          invoiceNumber={nextInvoiceNumber}
          onSave={handleSave} 
          onPrint={handleSave}
          isSaving={isSaving} 
        />
      </div>
    </div>
  );
};

export default Invoice;