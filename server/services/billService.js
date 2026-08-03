import prisma from "../config/prisma.js";

export const createBill = async (billData, userId) => {
  const { customerName, customerMobile, discount, subtotal, gst, grandTotal, items } = billData;

  // Find the user's shop
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  if (!items || items.length === 0) {
    throw new Error("Cannot create an invoice with no items");
  }

  // Count existing bills in this shop to auto-generate the next invoice number
  const count = await prisma.bill.count({
    where: {
      shopId: shop.id,
    },
  });

  const invoiceNumber = `INV-${String(count + 1).padStart(4, "0")}`;

  // Create Bill and BillItems in a transaction
  const bill = await prisma.bill.create({
    data: {
      invoiceNumber,
      customerName: customerName || null,
      customerMobile: customerMobile || null,
      discount: Number(discount) || 0.00,
      subtotal: Number(subtotal),
      gst: Number(gst) || 0.00,
      grandTotal: Number(grandTotal),
      shopId: shop.id,
      billItems: {
        create: items.map((item) => ({
          quantity: Number(item.quantity),
          price: Number(item.price),
          total: Number(item.total),
          productName: item.productName,
          productId: item.productId,
        })),
      },
    },
    include: {
      billItems: true,
      shop: true,
    },
  });

  return bill;
};

export const getBills = async (userId) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const bills = await prisma.bill.findMany({
    where: {
      shopId: shop.id,
    },
    include: {
      billItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bills;
};

export const getBillById = async (billId, userId) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const bill = await prisma.bill.findFirst({
    where: {
      id: billId,
      shopId: shop.id,
    },
    include: {
      billItems: true,
      shop: true,
    },
  });

  if (!bill) {
    throw new Error("Invoice not found");
  }

  return bill;
};

export const deleteBill = async (billId, userId) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const bill = await prisma.bill.findFirst({
    where: {
      id: billId,
      shopId: shop.id,
    },
  });

  if (!bill) {
    throw new Error("Invoice not found");
  }

  await prisma.bill.delete({
    where: {
      id: billId,
    },
  });

  return {
    message: "Invoice deleted successfully",
  };
};

export const getNextInvoiceNumber = async (userId) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const count = await prisma.bill.count({
    where: {
      shopId: shop.id,
    },
  });

  return `INV-${String(count + 1).padStart(4, "0")}`;
};
