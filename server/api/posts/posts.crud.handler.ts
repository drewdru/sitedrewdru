import CrudController from "../../helpers/crud/controller";
import CrudService from "../../helpers/crud/service";
import {
  objectIdSchema,
  paginateValidationSchema,
} from "../../helpers/schemas";
import { swaggerRegister, yupValidator } from "../../utils/swagger";
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

@swaggerRegister("/posts")
export class PostsCRUDHandler {
  @yupValidator({
    route: "/:id",
    method: "get",
    validate: { path: objectIdSchema },
    // TODO: add Responses
    // TODO: add security
  })
  static async findOne(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const post = await controller.findOne(event);
    return responsePostSchema.cast(post, { stripUnknown: true });
  }

  @yupValidator({
    route: "/",
    method: "get",
    validate: { query: paginateValidationSchema },
    // TODO: add Responses
    // TODO: add security
  })
  static async findAll(event) {
    const controller = new CrudController(new CrudService(Post), "posts");
    const posts = await controller.findAll(event);
    return responsePostsSchema.cast(posts, { stripUnknown: true });
  }

  @yupValidator({
    route: "/",
    method: "post",
    validate: { body: createPostSchema },
    // TODO: add Responses
    // TODO: add security
  })
  static async create(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const post = await controller.create(event);
    return responsePostSchema.cast(post, { stripUnknown: true });
  }

  @yupValidator({
    route: "/:id",
    method: "put",
    validate: { path: objectIdSchema, body: updatePostSchema },
    // TODO: add Responses
    // TODO: add security
  })
  static async update(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    return await controller.update(event);
  }

  @yupValidator({
    route: "/",
    method: "put",
    validate: { body: updatePostsSchema },
    // TODO: add Responses
    // TODO: add security
  })
  static async updateMany(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    return await controller.updateMany(event);
  }

  @yupValidator({
    route: "/:id",
    method: "patch",
    validate: {
      path: objectIdSchema,
      body: patchPostSchema,
    },
    // TODO: add Responses
    // TODO: add security
  })
  static async patch(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const post = await controller.patch(event);
    return responsePostSchema.cast(post, { stripUnknown: true });
  }

  @yupValidator({
    route: "/",
    method: "patch",
    validate: { body: patchPostsSchema },
    // TODO: add Responses
    // TODO: add security
  })
  static async patchMany(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const result = await controller.patchMany(event);
    return result;
  }

  @yupValidator({
    route: "/:id",
    method: "delete",
    validate: { path: objectIdSchema },
    // TODO: add Responses
    // TODO: add security
  })
  static async remove(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    return await controller.remove(event);
  }
}
