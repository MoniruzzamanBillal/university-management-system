import { TacademicFaculty } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";

// ! creating academic faculty into DB
const createFacultyIntoDb = async (payload: TacademicFaculty) => {
  const result = await academicFacultyModel.create(payload);

  return result;
};

// ! get all data from DB
const getAllAcademicFacultyFromDb = async () => {
  const result = await academicFacultyModel.find();

  return result;
};

// ! get particular academic faculty
const getSingleAcademicFaculty = async (id: string) => {
  const result = await academicFacultyModel.findOne({ _id: id });
  return result;
};

// ! update academic faculty
const updateAcademicFacultyFromDb = async (
  id: string,
  payload: Partial<TacademicFaculty>
) => {
  const result = await academicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );

  return result;
};

export const academicFacultyServices = {
  createFacultyIntoDb,
  getAllAcademicFacultyFromDb,
  getSingleAcademicFaculty,
  updateAcademicFacultyFromDb,
};
