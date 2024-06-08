import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import config from "../../config";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.util";
import { Tuser } from "./user.interface";
import { userModel } from "./user.model";
import mongoose from "mongoose";
import { adminModel } from "../Admin/admin.model";
import { academicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { TFaculty } from "../Faculty/faculty.interface";
import { facultyModel } from "../Faculty/faculty.model";

//! function for creating a student into database
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
    console.log(error);

    throw new AppError(httpStatus.NOT_ACCEPTABLE, error);
  }

  //
};

// ! create faculty  in db
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<Tuser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set faculty role
  userData.role = "faculty";

  // * find academic department info
  const academicDepartment = await academicDepartmentModel.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // * create a user (transaction-1)
    const newUser = await userModel.create([userData], { session }); // array

    // * create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    const newFaculty = await facultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// ! create admin in db
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<Tuser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);
  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await adminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
};
