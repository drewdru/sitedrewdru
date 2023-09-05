// import cors from "cors";
// import "reflect-metadata";
import { createApp, createRouter } from "h3";
import { useRuntimeConfig } from "#imports";
import mongooseClient from "@/server/utils/mongoose";
import redisClient from "@/server/utils/redis";

redisClient.connect();

const config = useRuntimeConfig();
mongooseClient.connect(config.mongodb.url, config.mongodb.options);

const app = createApp();
// TODO: add CORS?
// const corsOptions = {
//   origin: config.VITE_SUBDOMAINS.map((item) => item.path),
//   optionsSuccessStatus: 200, // For legacy browser support
// };
// app.use(cors(corsOptions));

export default app;
