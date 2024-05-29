import { Tacademicsemester } from "../academicSemester/academicSemester.interface";

import { userModel } from "./user.model";

const findLastStudentId = async () => {
  const response = await userModel
    .find({ role: "student" }, { id: 1, _id: 0 })
    .sort({ id: -1 })
    .lean();

  if (response.length) {
    return response[0].id;
  }

  return undefined;
};

export const generateStudentId = async (payload: Tacademicsemester) => {
  let currentId = "0";

  // 22 10 3018
  const lastStudentId = await findLastStudentId();

  const lastStuYear = lastStudentId?.substring(0, 2);
  const lastStuSemCode = lastStudentId?.substring(2, 4);

  const currentYear = payload.year.slice(-2);
  const currentSemCode = payload.code;

  if (
    lastStudentId &&
    lastStuYear === currentYear &&
    lastStuSemCode === currentSemCode
  ) {
    currentId = lastStudentId.substring(4);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${currentYear}${payload.code}${incrementId}`;

  return incrementId;
};
