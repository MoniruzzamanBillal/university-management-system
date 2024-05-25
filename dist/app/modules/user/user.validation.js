"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "password mustt be string ",
    })
        .max(20, "password can not be more than 20 characters ")
        .optional(),
});
