import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationModel } from "./semesterRegistration.model.";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

// ! create  new semester registration into db
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterRegistrationExist = await semesterRegistrationModel.findOne({
    academicSemester,
  });

  //  * check if there is any 'upcoming' or 'ingoing' semester
  const isThereUpcomingOrOngoingSemester =
    await semesterRegistrationModel.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already ${isThereUpcomingOrOngoingSemester?.status} registered semester !! `
    );
  }

  // * check academic semester exist
  const isAcademicSemesterExist =
    await academicSemesterModel.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found !! "
    );
  }

  // * check this  semester is already registeded
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
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModel.find(),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result =
    await semesterRegistrationQuery.queryModel.populate("academicSemester");
  return result;
};

// ! get particular semester registration data into db
const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await semesterRegistrationModel
    .findById(id)
    .populate("academicSemester");

  return result;
};

// ! update  particular semester registration data into db
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  // * check academic semester exist
  const isSemesterRegistrationExist =
    await semesterRegistrationModel.findById(id);

  const requestedStatus = payload?.status;

  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This  semester is not registered !! "
    );
  }

  // * check if requested data is ended or not
  const currentSemesterStatus = isSemesterRegistrationExist?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this semester is already ${currentSemesterStatus} `
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from  ${currentSemesterStatus} to ${requestedStatus}  `
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from  ${currentSemesterStatus} to ${requestedStatus}  `
    );
  }

  // upcoming --> ongoing --> ended

  const result = await semesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  );

  return result;

  //
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
