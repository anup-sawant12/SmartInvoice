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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Invoice
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition"
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
    </div>
  );
};

export default Invoice;