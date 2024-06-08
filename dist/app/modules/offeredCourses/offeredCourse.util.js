"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = void 0;
const hasTimeConflict = (assignedSchedule, newSchedule) => {
    for (const schedule of assignedSchedule) {
        const existingStartTime = new Date(`1970-01-01T${schedule === null || schedule === void 0 ? void 0 : schedule.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${schedule === null || schedule === void 0 ? void 0 : schedule.endTime}`);
        const newStartTime = new Date(`1970-01-01T${newSchedule === null || newSchedule === void 0 ? void 0 : newSchedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newSchedule === null || newSchedule === void 0 ? void 0 : newSchedule.endTime}`);
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }
    return false;
};
exports.hasTimeConflict = hasTimeConflict;
