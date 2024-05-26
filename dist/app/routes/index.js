"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const mainRouter = (0, express_1.Router)();
const modularRouter = [
    {
        path: "/users",
        route: user_route_1.userRouter,
    },
    {
        path: "/students",
        route: student_route_1.StudentRouter,
    },
];
modularRouter.forEach((route) => {
    mainRouter.use(route.path, route.route);
});
exports.default = mainRouter;
