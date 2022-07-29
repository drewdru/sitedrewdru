// import httpStatus from 'http-status';
// import aqp from 'api-query-params';
// import Response from '../response';
import { CompatibilityEvent, sendError } from "h3";
import { DatabaseError, DatabaseNotFoundError } from "@/server/errors/database";

class Controller {
  service: any; // TODO: type IBaseServise
  _name: string;
  constructor(service, name) {
    this.service = service;
    this._name = name;
  }

  async create(event) {
    const data = event.req.context.body;
    try {
      const result = await this.service.create(data);
      event.res.statusCode = 201;
      return result;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }

  async findAll(event) {
    try {
      const result = await this.service.findAll(event.req.context.query);
      return result;
      // event.res.statusCode = 200;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }

  async findOne(event: CompatibilityEvent) {
    try {
      const objectId = event.req.context.params.id;
      const result = await this.service.findById(objectId);
      if (!result) {
        throw new DatabaseNotFoundError(
          `${this._name.toUpperCase()} does not found with id ${objectId}`
        );
      }
      // event.res.statusCode = 200;
      return result;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }

  async update(event) {
    const data = event.req.context.body;
    const objectId = event.req.context.params.id;
    try {
      await this.service.update(objectId, data);
      event.res.statusCode = 204;
      return null;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }

  async updateMany(event) {
    const data = event.req.context.body;
    try {
      await this.service.updateMany(data);
      event.res.statusCode = 204;
      return null;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }

  async patch(event) {
    const data = event.req.context.body;
    const objectId = event.req.context.params.id;
    try {
      const result = await this.service.patch(objectId, data);
      if (!result) {
        throw new DatabaseNotFoundError(
          `${this._name.toUpperCase()} does not found with id ${objectId}`
        );
      }
      event.res.statusCode = 200;
      return result;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }

  async patchMany(event) {
    const data = event.req.context.body;
    try {
      const result = await this.service.patchMany(data);
      event.res.statusCode = 200;
      return result;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }

  async remove(event) {
    try {
      const objectId = event.req.context.params.id;
      const result = await this.service.remove(objectId);
      if (!result) {
        throw new DatabaseNotFoundError(
          `${this._name.toUpperCase()} does not found with id ${objectId}`
        );
      }
      event.res.statusCode = 204;
      return null;
    } catch (error) {
      sendError(
        event,
        error.statusCode ? error : new DatabaseError(error.message)
      );
    }
  }
}

export default Controller;
