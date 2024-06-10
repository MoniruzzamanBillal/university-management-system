import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { authServices } from "./auth.service";

// ! login
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: false,
  });

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      accessToken,
      needsPasswordChange,
    },
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

// ! refresh token
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
};
