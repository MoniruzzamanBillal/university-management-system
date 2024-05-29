import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { userModel } from "../user/user.model";

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate("user")
    .populate("admissionSemester")
    .populate({
      path: "AcademicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById({ _id: id })
    .populate("user")
    .populate("admissionSemester")
    .populate({
      path: "AcademicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete  user !! ");
    }

    const deleteStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete  student !! "
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
    //
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.NOT_MODIFIED,
      "unsuccessfull deletation of user and student !!  "
    );
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
