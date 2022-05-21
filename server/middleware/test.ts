// import type { IncomingMessage, ServerResponse } from "http";
// import { defineEventHandler } from "#app";

export default defineEventHandler((event) => {
  console.log("New request: " + event.req.url);
});
