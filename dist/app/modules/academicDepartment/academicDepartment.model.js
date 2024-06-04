"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.academicDepartmentModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Department name is required !!"],
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Academic faculty is required !!"],
        ref: "AcademicFaculty",
    },
});
academicDepartmentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDeptExist = yield exports.academicDepartmentModel.findOne({
            name: this.name,
        });
        if (isDeptExist) {
            throw new Error("Department already exist !!!");
        }
        next();
    });
});
academicDepartmentSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isDeptExist = yield exports.academicDepartmentModel.findOne(query);
        if (!isDeptExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Department does not exist!!!");
        }
        next();
    });
});
exports.academicDepartmentModel = mongoose_1.default.model("AcademicDepartment", academicDepartmentSchema);
