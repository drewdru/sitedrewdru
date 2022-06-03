import { createApp, createRouter, defineEventHandler } from "h3";
import { PostsCRUDHandler } from "./posts.crud.handler";

const router = createRouter();
// TODO: switch to useBase after bug fixed https://github.com/nuxt/framework/issues/5242
// router.get("/", defineEventHandler(PostsCRUDHandler.findAll));
// router.post("/", defineEventHandler(PostsCRUDHandler.create));
// router.use("/", defineEventHandler(PostsCRUDHandler.patchMany), "patch");
// export default useBase("/api/posts", router.handler);
const app = createApp();

router.get("/api/posts", defineEventHandler(PostsCRUDHandler.findAll));
router.post("/api/posts", defineEventHandler(PostsCRUDHandler.create));
// TODO: Fix put methods
// router.put("/", defineEventHandler(PostsCRUDHandler.updateMany));
router.use(
  "/api/posts",
  defineEventHandler(PostsCRUDHandler.patchMany),
  "patch"
);

export default app.use(router.handler);
