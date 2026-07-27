import prisma from "../config/prisma.js";




export const createShop = async (shopData, userId, logoUrl = null) => {
    const { shopName, address, mobile, gstNumber } = shopData;

    const existingShop = await prisma.shop.findUnique({
        where: {
            userId
        }
    });

    if (existingShop) {
        throw new Error("Shop already exists");
    }

    const shop = await prisma.shop.create({
        data: {
            shopName,
            address,
            mobile,
            gstNumber,
            logo: logoUrl,
            userId,
        },
    });

    return shop;
};

//search shop
export const getShop = async (userId) => {
  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  return shop;
};

//update shop
export const updateShop = async (shopData, userId, logoUrl = null) => {
  const { shopName, address, mobile, gstNumber } = shopData;

  const existingShop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });

  if (!existingShop) {
    throw new Error("Shop not found");
  }

  const shop = await prisma.shop.update({
    where: {
      userId,
    },
    data: {
      shopName,
      address,
      mobile,
      gstNumber,
      ...(logoUrl && { logo: logoUrl }),
    },
  });

  return shop;
};