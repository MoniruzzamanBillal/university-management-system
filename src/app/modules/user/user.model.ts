import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUSerModel, Tuser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<Tuser, TUSerModel>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
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

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//! statics to check user with custom id
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await userModel.findOne({ id });
};

//! statics to check user with custom id
userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await userModel.findOne({ id });
  return user?.isDeleted;
};

//! statics to check user with custom id
userSchema.statics.getUserStatus = async function (id: string) {
  const user = await userModel.findOne({ id });
  return user?.status;
};

export const userModel = model<Tuser, TUSerModel>("User", userSchema);
