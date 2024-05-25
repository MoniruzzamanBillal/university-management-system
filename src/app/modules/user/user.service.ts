import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { Tuser } from "./user.interface";
import { userModel } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";
  userData.id = "22103019";

  // ! create a user
  const newUser = await userModel.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    console.log(studentData);
    const newStudent = await StudentModel.create(studentData);

    return newStudent;
  }

  // ! create a student

  //
};

export const userServices = {
  createStudentIntoDB,
};
