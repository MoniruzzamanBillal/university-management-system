"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.queryModel = modelQuery;
        this.query = query;
    }
    //   ! for searching
    search(SearchableFields) {
        var _a;
        let searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.queryModel = this.queryModel.find({
                $or: SearchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    //   ! for filtering
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludedQueryField = [
            "searchTerm",
            "sort",
            "limit",
            "page",
            "fields",
        ];
        excludedQueryField.forEach((value) => delete queryObj[value]);
        this.queryModel = this.queryModel.find(queryObj);
        return this;
    }
    //   ! for sorting
    sort() {
        var _a, _b;
        const sort = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",").join(" ")) || "-createdAt";
        this.queryModel = this.queryModel.sort(sort);
        return this;
    }
    //   ! paginate
    paginate() {
        var _a, _b;
        const limit = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 1;
        const page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit;
        this.queryModel = this.queryModel.skip(skip).limit(limit);
        return this;
    }
    //   ! field
    fields() {
        var _a, _b;
        const fields = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",").join(" ")) || "-__v";
        this.queryModel = this.queryModel.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
