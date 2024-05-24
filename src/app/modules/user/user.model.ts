import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { Tuser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      unique: true,
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

userSchema.pre("save", async function name(next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const userModel = mongoose.model<Tuser>("User", userSchema);
