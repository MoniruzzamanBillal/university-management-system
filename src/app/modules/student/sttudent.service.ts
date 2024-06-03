import mongoose from "mongoose";
import { StudentModel } from "./student.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { userModel } from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  /* 
  { email : { $regex : query.searchTerm , $options : i } }
  */

  const queryObj = { ...query };

  let searchTerm = "";
  let studentSearchableFields = ["email", "name.firstName", "presentAddress"];
  const excludedField = ["searchTerm", "sort", "limit"].forEach(
    (value) => delete queryObj[value]
  );

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = StudentModel.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const filterQuery = searchQuery
    .find(queryObj)
    .populate("user")
    .populate("admissionSemester")
    .populate({
      path: "AcademicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "-createdAt";
  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let limit = 1;

  if (query?.limit) {
    limit = query?.limit as number;
  }

  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
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
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.NOT_MODIFIED,
      "unsuccessfull deletation of user and student !!  "
    );
  }
};

const updateStudentFromDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, localGuardian, guardian, ...remainingStudentData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  const result = StudentModel.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDb,
};
