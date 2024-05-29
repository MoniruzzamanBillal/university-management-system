import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import config from "../../config";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { generateStudentId } from "./student.util";
import { Tuser } from "./user.interface";
import { userModel } from "./user.model";
import mongoose from "mongoose";

//! function for creating a student inot database
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const semesterData = await academicSemesterModel.findById({
    _id: studentData.admissionSemester,
  });

  if (!semesterData) {
    throw new AppError(httpStatus.NOT_FOUND, "invalid semester !!!");
  }
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(semesterData);

    //* create a user // transaction 1
    const newUser = await userModel.create([userData], { session });

    //* create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "User not created !! ");
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    //* create a student // transaction 2
    const newStudent = await StudentModel.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student not created !! ");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
  }

  //
};

export const userServices = {
  createStudentIntoDB,
};
