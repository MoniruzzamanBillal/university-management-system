import { NextFunction, Request, Response } from "express";
import catchAsync from "../util/catchAsync";
import AppError from "../Error/AppError";
import httpStatus from "http-status";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { userModel } from "../modules/user/user.model";

const authValidation = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //  * check if user give any token
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Not authorized!!");
    }

    // *  verify the token

    const decoded = Jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access !!!");
    }

    // * check if user exist
    const user = await userModel.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user dont exits!!!");
    }

    // * check if user is deleted

    const isUserDeleted = await userModel.isUserDeleted(userId);

    if (isUserDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !!!");
    }

    //  * check if user is blocked or not

    const userStatus = await userModel.getUserStatus(userId);

    if (userStatus === "blocked") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!!");
    }

    // * check if token is created before password change
    if (user?.passwordChangedAt) {
      const jwtAfterPasswordUpdate =
        await userModel.isJWTissuedBeforePasswordChange(
          user?.passwordChangedAt as Date,
          iat as number
        );

      console.log(jwtAfterPasswordUpdate);
      if (jwtAfterPasswordUpdate) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized !!! "
        );
      }
    }

    req.user = decoded;
    next();
  });
};

export default authValidation;
