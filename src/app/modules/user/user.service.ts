import config from "../../config";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { generateStudentId } from "./student.util";
import { Tuser } from "./user.interface";
import { userModel } from "./user.model";

//! function for creating a student inot database
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const semesterData = await academicSemesterModel.findById({
    _id: studentData.admissionSemester,
  });

  if (!semesterData) {
    throw new Error("invalid semester !!!");
  }
  const userData: Partial<Tuser> = {};

  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";

  userData.id = await generateStudentId(semesterData);

  //* create a user
  const newUser = await userModel.create(userData);

  //* create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    console.log("hello world!!");
    const newStudent = await StudentModel.create(studentData);

    console.log(newStudent);

    return newStudent;
  }

  //
};

export const userServices = {
  createStudentIntoDB,
};
