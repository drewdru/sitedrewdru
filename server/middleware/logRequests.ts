export default defineEventHandler((event) => {
  console.log(
    `New request: [${event.req.method}]: ${event.req.url} ${event.res.statusCode}`
  );
});
