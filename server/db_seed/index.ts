import * as dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../api/users/users.model";
import { createAdminAccount } from "./user_seeder";

mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});
mongoose.connection.once("open", () => {
  console.info("Successfully connected to the database");
});

dotenv.config();

(async () => {
  try {
    console.info("=======seeding data===========");
    console.log("DATABASE_URL", process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL, {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    });
    await createAdminAccount();
    await User.syncIndexes();
    console.info("=======seeded data was successfully===========");
  } catch (error) {
    console.error("==============error==========%j", error);
  }
})();
