import { number, object, string, boolean, date, array } from "yup";

export const createPostSchema = object({
  title: string().trim().required(),
  text: string().trim().required(),
  description: string().trim(),
  preview: string().url().nullable(),
  isPremium: boolean(),
});

export const updatePostSchema = object({
  title: string().trim().required(),
  text: string().trim().required(),
  description: string().trim().required(),
  preview: string().url().nullable().required(),
  isPremium: boolean().required(),
});

export const patchPostSchema = object({
  title: string().trim(),
  text: string().trim(),
  description: string().trim(),
  preview: string().url().nullable(),
  isPremium: boolean(),
});

export const responsePostSchema = object({
  id: string(),
  title: string(),
  text: string(),
  description: string(),
  preview: string(),
  isPremium: boolean(),
  createdAt: date(),
  updatedAt: date(),
}).from("_id", "id", true);

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
