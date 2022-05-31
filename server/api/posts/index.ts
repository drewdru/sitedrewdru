import { createRouter, defineEventHandler, useBase } from "h3";
import { PostsCRUDHandler } from "./posts.crud.handler";

const router = createRouter();
router.get("/", defineEventHandler(PostsCRUDHandler.findAll));
router.post("/", defineEventHandler(PostsCRUDHandler.create));
// TODO: add update many router
// router.put("/", defineEventHandler(PostsCRUDHandler.updateMany));

export default useBase("/api/posts", router.handler);
