import { Types } from "mongoose";

export type Tmonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TacademicSemesterName = "spring" | "summer" | "fall";
export type TacademicSemesterCode = "01" | "02" | "03";

export type Tacademicsemester = {
  _id?: Types.ObjectId;
  name: TacademicSemesterName;
  code: TacademicSemesterCode;
  year: string;
  startMonth: Tmonths;
  endMonth: Tmonths;
};
