import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { userModel } from "../user/user.model";
import { TChangePassowrd, TLoginuser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import createToken from "./auth.util";
import { sendEmail } from "../../util/sendEmail";

//  ! login
const loginUser = async (payload: TLoginuser) => {
  const id = payload?.id;
  // * check if user exist
  const user = await userModel.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user dont exits!!!");
  }

  // * check if user is deleted

  const isUserDeleted = await userModel.isUserDeleted(id);

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !!!");
  }

  //  * check if user is blocked or not

  const userStatus = await userModel.getUserStatus(id);

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!!");
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password don't match !!");
  }

  // * create token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    "4d"
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    "10d"
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

// ! change password
const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassowrd
) => {
  const user = await userModel.isUserExistsByCustomId(userData.userId);

  const isPasswordMatch = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password don't match !!");
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await userModel.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData?.role,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

// ! refresh token
const refreshToken = async (token: string) => {
  //  * check if refresh token is valid
  const decoded = Jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  const { userId, iat } = decoded;

  //  * checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // *  checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // *  checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  if (
    user.passwordChangedAt &&
    (await userModel.isJWTissuedBeforePasswordChange(
      user.passwordChangedAt,
      iat as number
    ))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    "1d"
  );

  return {
    accessToken,
  };
};

// ! forgot password
const forgetPassword = async (userId: string) => {
  const user = await userModel.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // * checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // * checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    "10m"
  );

  const resetUILink = `http://localhost:3000?id=${user.id}&token=${resetToken} `;

  console.log(resetUILink);

  sendEmail(resetUILink);

  // return resetUILink;

  //
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked

  if (user?.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const decoded = Jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (payload.id !== decoded.userId) {
    console.log(payload.id, decoded.userId);
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await userModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};

export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
