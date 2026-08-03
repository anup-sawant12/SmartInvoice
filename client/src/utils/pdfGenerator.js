import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (bill, shop) => {
  const doc = new jsPDF();

  // Colors
  const primaryColor = [37, 99, 235]; // Tailwind blue-600
  const textColor = [55, 65, 81]; // Tailwind gray-700
  const darkColor = [17, 24, 39]; // Tailwind gray-900

  // 1. Header (Shop Details)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(shop?.shopName || "SmartInvoice", 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(shop?.address || "Shop Address", 14, 28);
  doc.text(`Mobile: ${shop?.mobile || "N/A"}`, 14, 34);
  if (shop?.gstNumber) {
    doc.text(`GSTIN: ${shop.gstNumber}`, 14, 40);
  }

  // 2. Invoice Title / Metadata
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text("INVOICE", 150, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`Invoice No: ${bill.invoiceNumber || "N/A"}`, 150, 28);
  
  const dateObj = bill.createdAt || bill.billDate || new Date();
  const dateFormatted = new Date(dateObj).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  doc.text(`Date: ${dateFormatted}`, 150, 34);

  // Line separator
  doc.setDrawColor(209, 213, 219); // gray-300
  doc.line(14, 46, 196, 46);

  // 3. Customer Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text("Bill To:", 14, 54);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(`Customer Name: ${bill.customerName || "Walk-in Customer"}`, 14, 61);
  doc.text(`Mobile: ${bill.customerMobile || "N/A"}`, 14, 67);

  // Line separator
  doc.line(14, 73, 196, 73);

  // 4. Items Table
  const tableColumn = ["S.No.", "Product Name", "Qty (kg)", "Rate / kg", "Total"];
  const tableRows = [];

  const items = bill.billItems || bill.items || [];
  items.forEach((item, index) => {
    const qtyText = `${item.quantity} kg`;
    const rateText = `INR ${Number(item.price).toFixed(2)}`;
    const totalText = `INR ${Number(item.total).toFixed(2)}`;

    const rowData = [
      index + 1,
      item.productName,
      qtyText,
      rateText,
      totalText,
    ];
    tableRows.push(rowData);
  });

  const tableFoot = [
    ["", "", "", "Subtotal:", `INR ${Number(bill.subtotal).toFixed(2)}`],
    ["", "", "", "Discount:", `- INR ${Number(bill.discount).toFixed(2)}`],
    ["", "", "", "GST:", `+ INR ${Number(bill.gst).toFixed(2)}`],
    ["", "", "", "Grand Total:", `INR ${Number(bill.grandTotal).toFixed(2)}`]
  ];

  autoTable(doc, {
    startY: 78,
    head: [tableColumn],
    body: tableRows,
    foot: tableFoot,
    theme: "striped",
    headStyles: { fillColor: primaryColor, halign: "center", fontSize: 9 },
    footStyles: { fillColor: [243, 244, 246], textColor: darkColor, fontStyle: "bold", fontSize: 9 },
    columnStyles: {
      0: { halign: "center", cellWidth: 15 },
      1: { halign: "left" },
      2: { halign: "center", cellWidth: 35 },
      3: { halign: "right", cellWidth: 30 },
      4: { halign: "right", cellWidth: 30 },
    },
    styles: { fontSize: 9, cellPadding: 4 },
  });

  // 5. Footer (below the table)
  const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : doc.previousAutoTable ? doc.previousAutoTable.finalY : 120) + 15;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128); // gray-500
  doc.text("Thank you for visiting!", 105, finalY, { align: "center" });

  // Save the file
  doc.save(`Invoice_${bill.invoiceNumber || "Draft"}.pdf`);
};
