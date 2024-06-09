import { Model } from "mongoose";

export interface Tuser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface TUSerModel extends Model<Tuser> {
  isUserExistsByCustomId(id: string): Promise<Tuser>;
  isUserDeleted(id: string): Promise<boolean>;
  getUserStatus(id: string): Promise<"in-progress" | "blocked" | null>;
}
