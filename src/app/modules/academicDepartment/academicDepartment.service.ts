import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TacademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";

// ! create academic department into DB
const createAcademicDepartmentIntoDB = async (payload: TacademicDepartment) => {
  const result = await academicDepartmentModel.create(payload);

  return result;
};

// ! get all academic data from DB
const getAllAcademicDepartment = async () => {
  const result = await academicDepartmentModel
    .find()
    .populate("academicFaculty");
  return result;
};

// ! get specific academic data from DB
const getAcademicDepartment = async (id: string) => {
  const result = await academicDepartmentModel
    .findOne({ _id: id })
    .populate("academicFaculty");
  return result;
};

// ! update  specific academic data from DB
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TacademicDepartment>
) => {
  const result = await academicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getAcademicDepartment,
  updateAcademicDepartment,
};
