import type { IncomingMessage, ServerResponse } from "http";
import { useQuery } from "h3";
import User from "./users/users.model";
// import config from "#config";
export default async (req: IncomingMessage, _res: ServerResponse) => {
  const admin = await User.findOne({ email: process.env.DEFAULT_ADMIN_EMAIL });
  console.log("hello config:", admin);
  return {
    query: useQuery(req),
  };
};
