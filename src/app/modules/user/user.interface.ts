import { Model } from "mongoose";
import { UserRole } from "./user.constant";

export interface Tuser {
  id: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface TUSerModel extends Model<Tuser> {
  isUserExistsByCustomId(id: string): Promise<Tuser>;
  isUserDeleted(id: string): Promise<boolean>;
  getUserStatus(id: string): Promise<"in-progress" | "blocked" | null>;
  isJWTissuedBeforePasswordChange(
    passwordChangedTimestamp: Date,
    jwtIssuedTimeStamp: number
  ): boolean;
}

export type TUserRole = keyof typeof UserRole;
