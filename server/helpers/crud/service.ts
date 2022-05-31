// import mongoose from "mongoose";
// import { Pagination } from "mongoose-paginate-ts";

// TODO: add and implement interfase:
// interfase IBaseServise
class Service {
  _model: any; // TODO: fix type: mongoose.Model<any, Pagination<any>>;
  constructor(model: any) {
    this._model = model;
  }

  async findAll(query) {
    const { filter, page, limit, sort } = query;
    console.log(filter, page, limit, sort);
    const result = await this._model.paginate({
      query: filter || {},
      page: page || 1,
      limit: limit || 25,
      sort: sort || "-_id",
    });
    return result;
  }

  async findById(id) {
    const result = await this._model.findById(id);
    return result;
  }

  async findOne(data) {
    const result = await this._model.findOne(data);
    return result;
  }

  async find(data) {
    const result = await this._model.find(data);
    return result;
  }

  async create(data) {
    const result = await this._model.create(data);
    return result;
  }

  async update(id, data) {
    const result = await this._model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
      context: "query",
    });
    return result;
  }

  async remove(id) {
    const result = await this._model.findByIdAndRemove(id);
    return result;
  }
}

export default Service;
