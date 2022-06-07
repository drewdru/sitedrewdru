import { number, object, string, boolean, date, array } from "yup";
import { ObjectId, atLeastOneKey } from "../../helpers/schemas";

export const createPostSchema = object({
  title: string().trim().required(),
  text: string().trim().required(),
  description: string().trim(),
  preview: string().url().nullable(),
  isPremium: boolean(),
}).meta({
  title: "Create Post",
  description: "Returns created Post",
});

export const updatePostSchema = object({
  title: string().trim().default(""),
  text: string().trim().default(""),
  description: string().trim().default(""),
  preview: string().url().nullable().default(null),
  isPremium: boolean().default(false),
}).meta({
  title: "Update Post",
  description: "Update created Post",
});

export const patchPostSchema = object({
  title: string().trim(),
  text: string().trim(),
  description: string().trim(),
  preview: string().url().nullable(),
  isPremium: boolean(),
}).meta({
  title: "Patch Post attributes",
  description: "Returns updated Post",
});

export const responsePostSchema = object({
  id: ObjectId,
  title: string(),
  text: string(),
  description: string(),
  preview: string().url().nullable(),
  isPremium: boolean(),
  createdAt: date(),
  updatedAt: date(),
})
  .from("_id", "id", true)
  .meta({
    title: "Post",
    description: "Returns Post data",
  });

export const responsePostsSchema = object({
  posts: array().of(responsePostSchema),
  limit: number(),
  totalPosts: number(),
  totalPages: number(),
  page: number(),
  pagingCounter: number(),
  hasPrevPage: boolean(),
  hasNextPage: boolean(),
  prevPage: number().nullable(),
  nextPage: number().nullable(),
})
  .from("docs", "posts", true)
  .from("totalDocs", "totalPosts", true)
  .meta({
    title: "Posts list",
    description: "Returns paginated Posts list",
  });

const updatePostsSchemaShape = {
  id: ObjectId.nullable(),
  title: string().trim().default(""),
  text: string().trim().default(""),
  description: string().trim().default(""),
  preview: string().url().nullable().default(null),
  isPremium: boolean().default(false),
};

export const updatePostsSchema = array()
  .of(object(updatePostsSchemaShape).test(atLeastOneKey()))
  .min(1)
  .meta({
    title: "Posts list to update or create",
    description: "Bulk Post update or create",
  });

export const patchPostsSchema = array()
  .of(
    object({
      id: ObjectId.required(),
      title: string().trim(),
      text: string().trim(),
      description: string().trim(),
      preview: string().url().nullable(),
      isPremium: boolean(),
    })
  )
  .min(1)
  .meta({
    title: "Posts list to patch attributes",
    description: "Bulk Post's attributes update",
  });
