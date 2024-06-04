"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const faculty_route_1 = require("../modules/Faculty/faculty.route");
const router = (0, express_1.Router)();
const modularRouter = [
    {
        path: "/users",
        route: user_route_1.userRouter,
    },
    {
        path: "/students",
        route: student_route_1.StudentRouter,
    },
    {
        path: "/academic-semester",
        route: academicSemester_route_1.academicSemesterRouter,
    },
    {
        path: "/academic-faculty",
        route: academicFaculty_route_1.academicFacultyRouter,
    },
    {
        path: "/academic-department",
        route: academicDepartment_route_1.academicDepartmentRouter,
    },
    {
        path: "/faculty",
        route: faculty_route_1.FacultyRouter,
    },
];
modularRouter.forEach((route) => {
    router.use(route.path, route.route);
});
exports.mainRouter = router;
