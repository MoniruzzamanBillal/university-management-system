"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
//  ! login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // * check if user exist
    const isUserExist = yield user_model_1.userModel.findOne({ id: payload === null || payload === void 0 ? void 0 : payload.id });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user dont exits!!!");
    }
    // * check if user is deleted
    const isUserDeleted = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !!!");
    }
    //  * check if user is blocked or not
    const userStatus = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked !!!");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    console.log(isPasswordMatch);
    // * grant access token and refresh token
    return null;
});
exports.authServices = {
    loginUser,
};
