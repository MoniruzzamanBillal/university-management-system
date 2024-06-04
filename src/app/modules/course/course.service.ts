import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableField } from "./course.constant";
import { TCourse } from "./course.interface.";
import { courseModel } from "./course.model";

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

    const deleteCourses = await courseModel.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: {
          course: { $in: deletePrerequisits },
        },
      },
    });

    //*    adding  prerequisite process
    const addPrerequisits = preRequisiteCourses.filter(
      (element) => element.course && !element.isDeleted
    );

    console.log(addPrerequisits);

    const addCourses = await courseModel.findByIdAndUpdate(id, {
      $addToSet: {
        preRequisiteCourses: { $each: addPrerequisits },
      },
    });
  }

  const generalFieldUpdate = await courseModel.findByIdAndUpdate(
    id,
    modifiedData,
    {
      new: true,
      runValidators: true,
    }
  );

  const result = await courseModel
    .findById(id)
    .populate("preRequisiteCourses.course");

  return result;
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
