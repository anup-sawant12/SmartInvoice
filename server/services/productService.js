import prisma from "../config/prisma.js";

export const createProduct = async (productData, userId) => {
  const { name, category, price } = productData;

  // Find the user's shop
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  // Check if product already exists in this shop
  const existingProduct = await prisma.product.findFirst({
    where: {
      name,
      shopId: shop.id,
    },
  });

  if (existingProduct) {
    throw new Error("Product already exists");
  }

  // Create product
  const product = await prisma.product.create({
    data: {
      name,
      category,
      price,
      shopId: shop.id,
    },
  });

  return product;
};

export const updateProduct = async (productId, productData, userId) => {
  const { name, category, price } = productData;

  // Find user's shop
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  // Check product belongs to this shop
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      shopId: shop.id,
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // Update product
  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      category,
      price,
    },
  });

  return updatedProduct;
};

export const deleteProduct = async (productId, userId) => {
  // Find user's shop
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  // Check product belongs to this shop
  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      shopId: shop.id,
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return {
    message: "Product deleted successfully",
  };
};

export const getProducts = async (userId) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const products = await prisma.product.findMany({
    where: {
      shopId: shop.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export const getProductById = async (productId, userId) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      shopId: shop.id,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};