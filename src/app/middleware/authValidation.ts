import { NextFunction, Request, Response } from "express";
import catchAsync from "../util/catchAsync";
import AppError from "../Error/AppError";
import httpStatus from "http-status";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

const authValidation = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //  * check if user give any token
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Not authorized!!");
    }

    // *  verify the token
    Jwt.verify(token, config.jwt_secret as string, (error, decoded) => {
      if (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access !!!");
      }

      const role = (decoded as JwtPayload).role;

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access !!!");
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default authValidation;
