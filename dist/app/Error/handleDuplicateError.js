"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateError = (error) => {
    const regex = /name:\s*"([^"]+)"/;
    const match = error.message.match(regex);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${extractedMessage} is already exist`,
        },
    ];
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: " ",
        errorSources,
    };
};
exports.handleDuplicateError = handleDuplicateError;
