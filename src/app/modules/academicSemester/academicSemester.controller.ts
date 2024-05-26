import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { academicSemesterServices } from "./academicSemester.service";

const createSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createSemesterintoDb(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "New semester created successfully !!",
    data: result,
  });
});

export const academicSemesterController = {
  createSemester,
};
