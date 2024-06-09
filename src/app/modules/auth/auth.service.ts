import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { userModel } from "../user/user.model";
import { TChangePassowrd, TLoginuser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

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

  const accessToken = Jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
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

export const authServices = {
  loginUser,
  changePassword,
};
