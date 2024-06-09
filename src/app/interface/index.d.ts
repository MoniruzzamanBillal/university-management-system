import { JwtPayload } from "jsonwebtoken";
import { Express } from "./../../../node_modules/@types/express-serve-static-core/index.d";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
