import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableField } from "./course.constant";
import { TCourse } from "./course.interface.";
import { courseModel } from "./course.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";

//! create course in DB
const createCourseIntoDb = async (payload: TCourse) => {
  const result = await courseModel.create(payload);

  return result;
};

// ! get all course data  from database
const getAllDataFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(courseModel.find(), query)
    .search(courseSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.queryModel.populate(
    "preRequisiteCourses.course"
  );

  return result;
};

// ! get single course data
const getCourseDataFromDb = async (id: string) => {
  const result = await courseModel
    .findById(id)
    .populate("preRequisiteCourses.course");

  return result;
};

// ! update course data
const updateCourseDataIntoDb = async (
  id: string,
  payload: Partial<TCourse>
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { preRequisiteCourses, ...remainingData } = payload;

    const modifiedData: Record<string, unknown> = {
      ...remainingData,
    };

    // console.log(preRequisiteCourses);
    // ! check any prerequuisit course
    if (preRequisiteCourses && preRequisiteCourses.length) {
      //*    deleting prerequisite process
      const deletePrerequisits = preRequisiteCourses
        .filter((element) => element.course && element.isDeleted)
        .map((ele) => ele.course);

      const deleteCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletePrerequisits },
            },
          },
        },
        { new: true, runValidators: true, session }
      );

      if (!deleteCourse) {
        throw new AppError(
          httpStatus.NOT_MODIFIED,
          "Failed to delete pre requisite courses !! "
        );
      }

      //*    adding  prerequisite process
      const addPrerequisits = preRequisiteCourses.filter(
        (element) => element.course && !element.isDeleted
      );

      const addCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: addPrerequisits },
          },
        },
        { new: true, runValidators: true, session }
      );

      if (!addCourses) {
        throw new AppError(
          httpStatus.NOT_MODIFIED,
          "Failed to Add pre requisite courses !! "
        );
      }
    }

    //* genereal field update
    const generalUpdate = await courseModel.findByIdAndUpdate(
      id,
      modifiedData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!generalUpdate) {
      throw new AppError(
        httpStatus.NOT_MODIFIED,
        "Failed to update general course data  !! "
      );
    }

    const result = await courseModel
      .findById(id)
      .populate("preRequisiteCourses.course");

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error("unsuccessfull updation of course !!");
  }
};

// ! delete course data
const deleteCourseFromDb = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

//
export const courseServices = {
  createCourseIntoDb,
  getAllDataFromDb,
  getCourseDataFromDb,
  updateCourseDataIntoDb,
  deleteCourseFromDb,
};
