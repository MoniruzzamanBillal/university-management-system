import mongoose, { Schema } from "mongoose";
import { TCourse, TPreRequisitCourses } from "./course.interface.";

const preRequisiteCourseSchema = new Schema<TPreRequisitCourses>({
  course: {
    type: Schema.Types.ObjectId,
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
  },
  prefix: {
    type: String,
    required: [true, "Course prefix is required "],
  },
  code: {
    type: Number,
    required: [true, "Course code is required "],
  },
  credit: {
    type: Number,
    required: [true, "Course credit is required "],
  },
  preRequisiteCourses: [preRequisiteCourseSchema],
});

export const courseModel = mongoose.model("Course", courseSchema);
