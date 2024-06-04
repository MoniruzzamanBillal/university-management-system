import { Types } from "mongoose";

export type TPreRequisitCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credit: number;
  preRequisiteCourses: [];
};
