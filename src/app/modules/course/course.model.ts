import mongoose, { Schema } from "mongoose";
import { TCourse, TPreRequisitCourses } from "./course.interface.";

const preRequisiteCourseSchema = new Schema<TPreRequisitCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, "Course title is required "],
    trim: true,
  },
  prefix: {
    type: String,
    required: [true, "Course prefix is required "],
    trim: true,
  },
  code: {
    type: Number,
    required: [true, "Course code is required "],
    unique: true,
  },
  credit: {
    type: Number,
    required: [true, "Course credit is required "],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourses: [preRequisiteCourseSchema],
});

export const courseModel = mongoose.model("Course", courseSchema);
