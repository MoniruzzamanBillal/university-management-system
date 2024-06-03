import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = modelQuery;
    this.query = query;
  }

  //   ! for searching
  search(SearchableFields: string[]) {
    let searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: SearchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>
        ),
      });
    }

    return this;
  }

  //   ! for filtering
  filter() {
    const queryObj = { ...this.query };

    const excludedQueryField = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
    ];
    excludedQueryField.forEach((value) => delete queryObj[value]);
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  //   ! for sorting
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",").join(" ") || "-createdAt";
    this.queryModel = this.queryModel.sort(sort as string);
    return this;
  }

  //   ! paginate
  paginate() {
    const limit = Number(this?.query?.limit) || 1;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }

  //   ! field
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",").join(" ") || "-__v";

    this.queryModel = this.queryModel.select(fields);

    return this;
  }

  //
}

export default QueryBuilder;
