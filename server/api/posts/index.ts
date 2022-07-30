import { useBase, createRouter, defineEventHandler } from "h3";
import { PostsCRUDHandler } from "./posts.crud.handler";

const router = createRouter();
router.get("/", defineEventHandler(PostsCRUDHandler.findAll));
router.post("/", defineEventHandler(PostsCRUDHandler.create));
router.use("/", defineEventHandler(PostsCRUDHandler.patchMany), "patch");
export default useBase("/api/posts", router.handler);
