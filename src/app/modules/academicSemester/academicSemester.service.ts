import { Tacademicsemester } from "./academicSemester.interface";
import { academicSemesterModel } from "./academicSemester.model";

const createSemesterintoDb = async (paload: Tacademicsemester) => {
  const res = await academicSemesterModel.create(paload);
  return res;
};

export const academicSemesterServices = {
  createSemesterintoDb,
};
