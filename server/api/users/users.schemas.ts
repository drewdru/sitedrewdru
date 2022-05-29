import { number, object, string, boolean, date, array } from "yup";

export const createUserSchema = object({
  firstName: string().trim().required(),
  lastName: string().trim().required(),
  email: string().trim().email().required(),
  website: string().url().nullable(),
});

export const responseUserSchema = object({
  id: string(),
  role: string(),
  email: string().email(),
  firstName: string(),
  lastName: string(),
  gender: string(),
  username: string(),
  isPremium: boolean(),
  createdAt: date(),
  updatedAt: date(),
}).from("_id", "id", true);

export const responseUsersSchema = object({
  users: array().of(responseUserSchema),
  limit: number(),
  totalUsers: number(),
  totalPages: number(),
  page: number(),
  pagingCounter: number(),
  hasPrevPage: boolean(),
  hasNextPage: boolean(),
  prevPage: number().nullable(),
  nextPage: number().nullable(),
})
  .from("docs", "users", true)
  .from("totalDocs", "totalUsers", true)
  .meta({
    title: "Users list",
    description: "Returns paginated Users list",
  });
