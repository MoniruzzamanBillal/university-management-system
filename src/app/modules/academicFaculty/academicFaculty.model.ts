import mongoose from "mongoose";
import { TacademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new mongoose.Schema<TacademicFaculty>({
  name: {
    type: String,
    require: [true, "Academic faculty name is required!!"],
    unique: true,
  },
});

export const academicFacultyModel = mongoose.model(
  "AcademicFaculty",
  academicFacultySchema
);
