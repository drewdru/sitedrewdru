import { createRouter, defineEventHandler, useBase } from "h3";
import { PostsCRUDHandler } from "../posts.crud.handler";

const router = createRouter();

// TODO: defineCrudEventHandler
// for(const [httpMethod, methodName] of Object.entries(PostsCRUDHandler["/:id"]))
// router.use("/api/posts", defineEventHandler(PostsCRUDHandler[methodName], httpMethod
router.get("/:id", defineEventHandler(PostsCRUDHandler.findOne));
router.put("/:id", defineEventHandler(PostsCRUDHandler.update));
router.use("/:id", defineEventHandler(PostsCRUDHandler.patch), "patch");
router.delete("/:id", defineEventHandler(PostsCRUDHandler.remove));

export default useBase("/api/posts", router.handler);
