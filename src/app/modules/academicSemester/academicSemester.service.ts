import { semesterNameCodeMaper } from "../../util/semesterNameCodeMaper";
import { Tacademicsemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";

// ! creating semester in database
const createSemesterintoDb = async (paload: Tacademicsemester) => {
  if (semesterNameCodeMaper[paload.name] !== paload.code) {
    throw new Error("Invalid semester!!");
  }

  const res = await academicSemesterModel.create(paload);
  return res;
};

// ! getting all semester from db
const getAllSemester = async () => {
  const result = await academicSemesterModel.find();
  return result;
};

//! getting particular semester data from db
const getSingleSemester = async (id: string) => {
  const result = await academicSemesterModel.findById({ _id: id });

  return result;
};

// ! updating semester data
const updateSemesterIntoDb = async (
  id: string,
  payload: Partial<Tacademicsemester>
) => {
  if (
    payload.name &&
    payload.code &&
    semesterNameCodeMaper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code !! ");
  }

  const result = await academicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );

  return result;
};

//

export const academicSemesterServices = {
  createSemesterintoDb,
  getAllSemester,
  getSingleSemester,
  updateSemesterIntoDb,
};
