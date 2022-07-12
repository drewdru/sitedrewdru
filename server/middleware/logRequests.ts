export default defineEventHandler((event) => {
  // TODO: Can I run middleware after handler to get event.req.statusCode?
  console.log(`New request: [${event.req.method}]: ${event.req.url}`);
});
