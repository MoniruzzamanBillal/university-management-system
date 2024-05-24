import mongoose, { Schema } from "mongoose";
import { Tuser } from "./user.interface";

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
    },
    password: {
      type: String,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
