import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { userModel } from "../user/user.model";
import { TLoginuser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
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
    // id: user.id,
    userId: user,
    role: user.role,
  };
  const accessToken = Jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  console.log("token = ");
  console.log(accessToken);

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const authServices = {
  loginUser,
};
