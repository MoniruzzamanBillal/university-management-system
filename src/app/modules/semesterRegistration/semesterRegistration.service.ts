import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationModel } from "./semesterRegistration.model.";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";

// ! create  new semester registration into db
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterRegistrationExist = await semesterRegistrationModel.findOne({
    academicSemester,
  });

  // ! check academic semester exist
  const isAcademicSemesterExist =
    await academicSemesterModel.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found !! "
    );
  }

  // ! check this  semester is alreaddy registeded
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered !! "
    );
  }

  const result = await semesterRegistrationModel.create(payload);

  return result;

  //
};

// ! get all semester registration data into db
const getAllSemesterRegistrationsFromDB = async () => {
  console.log("checking !!! ");
};

// ! get particular semester registration data into db
const getSingleSemesterRegistrationsFromDB = async () => {
  console.log("checking !!! ");
};

// ! update  particular semester registration data into db
const updateSemesterRegistrationIntoDB = async () => {
  console.log("checking !!! ");
};

// ! delete  particular semester registration data into db
const deleteSemesterRegistrationFromDB = async () => {
  console.log("checking !!! ");
};

//
export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
