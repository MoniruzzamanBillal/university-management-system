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

  return `${currentYear}${payload.code}${incrementId}`;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await userModel
    .findOne(
      {
        role: "faculty",
      },
      {
        id: 1,
        _id: 0,
      }
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await userModel
    .findOne(
      {
        role: "admin",
      },
      {
        id: 1,
        _id: 0,
      }
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};
