import {
  createShop,
  getShop,
  updateShop,
} from "../services/shopService.js";

import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const create = async (req, res) => {
  try {
    const userId = req.user.userId;

    let logoUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "smartinvoice/shop-logos"
      );

      logoUrl = result.secure_url;
    }

    const shop = await createShop(
      req.body,
      userId,
      logoUrl
    );

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data: shop,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const userId = req.user.userId;

    const shop = await getShop(userId);

    return res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.user.userId;

    let logoUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "smartinvoice/shop-logos"
      );

      logoUrl = result.secure_url;
    }

    const shop = await updateShop(
      req.body,
      userId,
      logoUrl
    );

    return res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      data: shop,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};