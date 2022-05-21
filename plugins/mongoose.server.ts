import mongoose from "mongoose";
import { useRuntimeConfig, defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig();
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error: " + err); // eslint-disable-line no-console
    process.exit(-1);
  });
  mongoose.connection.once("open", () => {
    console.info("Successfully connected to the database"); // eslint-disable-line no-console
  });
  mongoose.connect(config.mongodb.url, config.mongodb.options);
});
