import mongoose from "mongoose";
import { Pagination } from "mongoose-paginate-ts";

// TODO: add and implement interfase:
// interfase IBaseServise
class Service {
  _model: Pagination<mongoose.Document>;
  constructor(model: any) {
    this._model = model;
  }

  async findAll(query) {
    const { filter, page, limit, sort } = query;
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
    return await this._model.updateOne({ _id: id }, data, {
      runValidators: true,
      context: "query",
    });
  }

  async updateMany(data) {
    const result = await this._model.bulkWrite(
      data.map((item) => {
        if (item.id) {
          return {
            updateOne: {
              filter: { _id: item.id },
              update: item,
              upsert: true,
            },
          };
        }
        return {
          insertOne: {
            document: item,
          },
        };
      })
    );
    return result;
  }

  async patch(id, data) {
    const result = await this._model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
      context: "query",
    });
    return result;
  }

  async patchMany(data) {
    const result = await this._model.bulkWrite(
      data.map((item) => {
        const updateData = {
          updateOne: {
            filter: { _id: item.id },
            update: item,
          },
        };
        return updateData;
      })
    );
    return result;
  }

  async remove(id) {
    const result = await this._model.findByIdAndRemove(id);
    return result;
  }
}

export default Service;
