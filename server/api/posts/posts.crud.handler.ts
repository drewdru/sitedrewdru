import {
  createPostSchema,
  responsePostSchema,
  responsePostsSchema,
  updatePostSchema,
  updatePostsSchema,
  patchPostSchema,
  patchPostsSchema,
} from "./posts.schemas";
import Post from "./posts.model";
import CrudController from "@/server/helpers/crud/controller";
import CrudService from "@/server/helpers/crud/service";
import {
  objectIdSchema,
  paginateValidationSchema,
} from "@/server/helpers/schemas";
import { swaggerRegister, yupValidator } from "@/server/utils/swagger";
import { ValidationError } from "@/server/errors/validation";
import { DatabaseError, DatabaseNotFoundError } from "@/server/errors/database";

const controller = new CrudController(new CrudService(Post), "post");

@swaggerRegister("/posts")
export class PostsCRUDHandler {
  @yupValidator({
    route: "/:id",
    method: "get",
    validate: { path: objectIdSchema },
    responses: [
      { status: 200, schema: responsePostSchema, cast: true },
      ValidationError.swaggerError,
      DatabaseNotFoundError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async findOne(event) {
    return await controller.findOne(event);
  }

  @yupValidator({
    route: "/",
    method: "get",
    validate: { query: paginateValidationSchema },
    responses: [
      { status: 200, schema: responsePostsSchema, cast: true },
      ValidationError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async findAll(event) {
    return await controller.findAll(event);
  }

  @yupValidator({
    route: "/",
    method: "post",
    validate: { body: createPostSchema },
    responses: [
      { status: 201, schema: responsePostSchema, cast: true },
      ValidationError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async create(event) {
    return await controller.create(event);
  }

  @yupValidator({
    route: "/:id",
    method: "put",
    validate: { path: objectIdSchema, body: updatePostSchema },
    responses: [
      { status: 204, schema: null },
      ValidationError.swaggerError,
      DatabaseNotFoundError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async update(event) {
    return await controller.update(event);
  }

  @yupValidator({
    route: "/",
    method: "put",
    validate: { body: updatePostsSchema },
    responses: [
      { status: 204, schema: null },
      ValidationError.swaggerError,
      DatabaseNotFoundError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async updateMany(event) {
    return await controller.updateMany(event);
  }

  @yupValidator({
    route: "/:id",
    method: "patch",
    validate: {
      path: objectIdSchema,
      body: patchPostSchema,
    },
    responses: [
      { status: 200, schema: responsePostSchema, cast: true },
      ValidationError.swaggerError,
      DatabaseNotFoundError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async patch(event) {
    return await controller.patch(event);
  }

  @yupValidator({
    route: "/",
    method: "patch",
    validate: { body: patchPostsSchema },
    responses: [
      { status: 204, schema: null },
      ValidationError.swaggerError,
      DatabaseNotFoundError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async patchMany(event) {
    return await controller.patchMany(event);
  }

  @yupValidator({
    route: "/:id",
    method: "delete",
    validate: { path: objectIdSchema },
    responses: [
      { status: 204, schema: null },
      ValidationError.swaggerError,
      DatabaseNotFoundError.swaggerError,
      DatabaseError.swaggerError,
    ],
    // TODO: add security
  })
  static async remove(event) {
    return await controller.remove(event);
  }
}
