import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { Tuser } from "./user.interface";
import { userModel } from "./user.model";

//! function for creating a student inot database
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";
  userData.id = studentData.id;

  //* create a user
  const newUser = await userModel.create(userData);

  //* create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }

  //
};

export const userServices = {
  createStudentIntoDB,
};
