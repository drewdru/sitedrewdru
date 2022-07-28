export default defineEventHandler((event) => {
  // TODO: get user from JWT token
  // args[0].req.headers.authorization
  (event.req as any).user = "TEST_USER";
});
