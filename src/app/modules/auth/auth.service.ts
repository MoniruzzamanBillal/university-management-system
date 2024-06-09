import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { userModel } from "../user/user.model";
import { TLoginuser } from "./auth.interface";
import bcrypt from "bcrypt";

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
    throw new AppError(httpStatus.BAD_REQUEST, "Password don't match !!");
  }

  // * grant access token and refresh token

  return null;
};

export const authServices = {
  loginUser,
};
