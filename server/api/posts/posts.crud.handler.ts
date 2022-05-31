import CrudController from "../../helpers/crud/controller";
import CrudService from "../../helpers/crud/service";
import {
  objectIdSchema,
  paginateValidationSchema,
} from "../../helpers/schemas";
import { validate } from "../../utils/validator";
import {
  createPostSchema,
  responsePostSchema,
  responsePostsSchema,
  updatePostSchema,
  patchPostSchema,
} from "./posts.schemas";
import Post from "./posts.model";

export class PostsCRUDHandler {
  @validate({ path: objectIdSchema })
  static async findOne(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const post = await controller.findOne(event);
    return responsePostSchema.cast(post, { stripUnknown: true });
  }

  @validate({ query: paginateValidationSchema })
  static async findAll(event) {
    const controller = new CrudController(new CrudService(Post), "posts");
    const posts = await controller.findAll(event);
    return responsePostsSchema.cast(posts, { stripUnknown: true });
  }

  @validate({ body: createPostSchema })
  static async create(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const post = await controller.create(event);
    return responsePostSchema.cast(post, { stripUnknown: true });
  }

  @validate({ path: objectIdSchema, body: updatePostSchema })
  static async update(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const post = await controller.update(event);
    return responsePostSchema.cast(post, { stripUnknown: true });
  }

  @validate({ path: objectIdSchema, body: patchPostSchema })
  static async patch(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    const post = await controller.patch(event);
    return responsePostSchema.cast(post, { stripUnknown: true });
  }

  @validate({ path: objectIdSchema })
  static async remove(event) {
    const controller = new CrudController(new CrudService(Post), "post");
    return await controller.remove(event);
  }
}
