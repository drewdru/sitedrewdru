import { createApp, createRouter } from "h3";
import mongooseClient from "../utils/mongoose";
import redisClient from "../utils/redis";
import { useRuntimeConfig } from "#imports";

redisClient.connect();

const config = useRuntimeConfig();
mongooseClient.connect(config.mongodb.url, config.mongodb.options);

const app = createApp();
const router = createRouter();
router.get(
  "/api",
  defineEventHandler((_event) => ({ data: "Hello World!" }))
);
// router.post("/", defineEventHandler(PostsCRUDHandler.create));
app.use(router.handler);

export default app;
