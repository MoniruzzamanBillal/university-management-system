import mongoose, { Schema } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TacademicDepartment>({
  name: {
    type: String,
    require: [true, "Department name is required !!"],
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    require: [true, "Academic faculty is required !!"],
    ref: "AcademicFaculty",
  },
});

export const academicDepartmentModel = mongoose.model(
  "AcademicDepartment",
  academicDepartmentSchema
);
