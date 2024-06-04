import mongoose, { Schema } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TacademicDepartment>({
  name: {
    type: String,
    required: [true, "Department name is required !!"],
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: [true, "Academic faculty is required !!"],
    ref: "AcademicFaculty",
  },
});

academicDepartmentSchema.pre("save", async function (next) {
  const isDeptExist = await academicDepartmentModel.findOne({
    name: this.name,
  });

  if (isDeptExist) {
    throw new Error("Department already exist !!!");
  }

  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDeptExist = await academicDepartmentModel.findOne(query);
  if (!isDeptExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Department does not exist!!!");
  }
  next();
});

export const academicDepartmentModel = mongoose.model(
  "AcademicDepartment",
  academicDepartmentSchema
);
