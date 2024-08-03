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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth_util_1 = __importDefault(require("./auth.util"));
//  ! login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = payload === null || payload === void 0 ? void 0 : payload.id;
    // * check if user exist
    const user = yield user_model_1.userModel.isUserExistsByCustomId(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user dont exits!!!");
    }
    // * check if user is deleted
    const isUserDeleted = yield user_model_1.userModel.isUserDeleted(id);
    if (isUserDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !!!");
    }
    //  * check if user is blocked or not
    const userStatus = yield user_model_1.userModel.getUserStatus(id);
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked !!!");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password don't match !!");
    }
    // * create token
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_util_1.default)(jwtPayload, config_1.default.jwt_secret, "1d");
    const refreshToken = (0, auth_util_1.default)(jwtPayload, config_1.default.jwt_secret, "10d");
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user.needsPasswordChange,
    };
});
// ! change password
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.isUserExistsByCustomId(userData.userId);
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password don't match !!");
    }
    const newHashPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.userModel.findOneAndUpdate({
        id: userData.userId,
        role: userData === null || userData === void 0 ? void 0 : userData.role,
    }, {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
// ! refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //  * check if refresh token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    const { userId, iat } = decoded;
    //  * checking if the user is exist
    const user = yield user_model_1.userModel.isUserExistsByCustomId(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // *  checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // *  checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    if (user.passwordChangedAt &&
        (yield user_model_1.userModel.isJWTissuedBeforePasswordChange(user.passwordChangedAt, iat))) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = (0, auth_util_1.default)(jwtPayload, config_1.default.jwt_secret, "1d");
    return {
        accessToken,
    };
});
exports.authServices = {
    loginUser,
    changePassword,
    refreshToken,
};
