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
const catchAsync_1 = __importDefault(require("../util/catchAsync"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const authValidation = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        //  * check if user give any token
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Not authorized!!");
        }
        // *  verify the token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const { role, userId, iat } = decoded;
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized access !!!");
        }
        // * check if user exist
        const user = yield user_model_1.userModel.isUserExistsByCustomId(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user dont exits!!!");
        }
        // * check if user is deleted
        const isUserDeleted = yield user_model_1.userModel.isUserDeleted(userId);
        if (isUserDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !!!");
        }
        //  * check if user is blocked or not
        const userStatus = yield user_model_1.userModel.getUserStatus(userId);
        if (userStatus === "blocked") {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked !!!");
        }
        // * check if token is created before password change
        if (user === null || user === void 0 ? void 0 : user.passwordChangedAt) {
            const jwtAfterPasswordUpdate = yield user_model_1.userModel.isJWTissuedBeforePasswordChange(user === null || user === void 0 ? void 0 : user.passwordChangedAt, iat);
            console.log(jwtAfterPasswordUpdate);
            if (jwtAfterPasswordUpdate) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !!! ");
            }
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authValidation;
