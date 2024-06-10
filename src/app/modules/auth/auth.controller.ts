import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { authServices } from "./auth.service";

// ! login
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: result,
  });
});

//  ! change password
const changePassword = catchAsync(async (req, res) => {
  await authServices.changePassword(req.user, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Password changed succesfully!",
    data: null,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
