import { Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../util/sendResponse";
import httpStatus from "http-status";

// ! function for creating a student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "New student created successfully !!",
      data: result,
    });
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
