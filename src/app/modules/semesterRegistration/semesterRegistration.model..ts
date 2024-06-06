import mongoose, { Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemmester",
    },
    status: {
      type: String,
      enum: {
        values: SemesterRegistrationStatus,
        message: "{VALUE} is not a valid semester status",
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
      default: 3,
    },
    maxCredit: {
      type: Number,
      required: true,
      default: 16,
    },
  },
  { timestamps: true }
);

export const semesterRegistrationModel = mongoose.model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
