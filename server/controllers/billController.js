import {
  createBill,
  getBills,
  getBillById,
  deleteBill,
  getNextInvoiceNumber,
} from "../services/billService.js";

export const create = async (req, res) => {
  try {
    const bill = await createBill(req.body, req.user.userId);

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: bill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const bills = await getBills(req.user.userId);

    res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const bill = await getBillById(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await deleteBill(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNextNumber = async (req, res) => {
  try {
    const nextNumber = await getNextInvoiceNumber(req.user.userId);

    res.status(200).json({
      success: true,
      data: nextNumber,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
