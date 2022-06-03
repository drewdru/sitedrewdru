export default defineEventHandler((event) => {
  // TODO: run middleware after handler
  console.log(
    `New request: [${event.req.method}]: ${event.req.url} ${event.res.statusCode}`
  );
});
