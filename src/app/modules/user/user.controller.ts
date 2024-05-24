import { Request, Response } from "express";

// ! function for creating a student
const createStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body;
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};

// ! function for creating a faculty
const createFaculty = async (req: Request, res: Response) => {
  try {
    const data = req.body;
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};

// ! function for creating an admin
const createAdmin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
  } catch (error: any) {
    res
      .status(400)
      .json({ success: false, message: error.message, error: error });
  }
};

//
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};
