import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";
import { resourceUsage } from "process";

// ! for creating a semester
const createSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createSemesterintoDb(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "New semester created successfully !!",
    data: result,
  });
});

// ! for getting all semester data
const getSmesters = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllSemester();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrived all semester data successfullyy !! ",
    data: result,
  });
});

// ! for getting single Semester
const getSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.getSingleSemester(semesterId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "semester data retrived successfully ",
    data: result,
  });
});

// ! updating semester
const updateSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const data = req.body;
  const result = await academicSemesterServices.updateSemesterIntoDb(
    semesterId,
    data
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "academic semester updated  successfully ",
    data: result,
  });
});

//

export const academicSemesterController = {
  createSemester,
  getSmesters,
  getSemester,
  updateSemester,
};
