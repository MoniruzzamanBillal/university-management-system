import mongoose, { Schema } from "mongoose";
import {
  TacademicSemesterCode,
  TacademicSemesterName,
  Tacademicsemester,
  Tmonths,
} from "./academicSemester.interface";
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from "./academicSemester.constant";
import { strict } from "assert";

const academicSemesterSchema = new Schema<Tacademicsemester>(
  {
    name: {
      type: String,
      require: [true, "Academic Semester name is required!!"],
      enum: academicSemesterName,
    },
    year: {
      type: String,
      require: [true, "Academic Semester year is required!!"],
    },
    code: {
      type: String,
      require: [true, "Academic Semester code is required!!"],
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      require: [true, "Academic Semester startMonth is required!!"],
      enum: months,
    },
    endMonth: {
      type: String,
      require: [true, "Academic Semester startMonth is required!!"],
      enum: months,
    },
  },
  { timestamps: true }
);

export const academicSemesterModel = mongoose.model<Tacademicsemester>(
  "AcademicSemmester",
  academicSemesterSchema
);
