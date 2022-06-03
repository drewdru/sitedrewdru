import { createRouter, defineEventHandler, useBase } from "h3";
import { PostsCRUDHandler } from "../posts.crud.handler";

const router = createRouter();

router.get("/:id", defineEventHandler(PostsCRUDHandler.findOne));
// TODO: Fix put methods
// router.put("/:id", defineEventHandler(PostsCRUDHandler.update));
router.use("/:id", defineEventHandler(PostsCRUDHandler.patch), "patch");
router.delete("/:id", defineEventHandler(PostsCRUDHandler.remove));

export default useBase("/api/posts", router.handler);
