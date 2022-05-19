import mongoose from "mongoose";

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig();
  mongoose.Promise = global.Promise;
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error: " + err);
    process.exit(-1);
  });
  mongoose.connection.once("open", () => {
    // we're connected!
    console.info("Successfully connected to the database");
  });
  mongoose.connect(config.mongodb.url, config.mongodb.options);
});
