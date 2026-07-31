export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("beforeResponse", async (event) => {
    const isProtectedRequest = event.path.startsWith('/api/v')
    const isSuccess = event.node.res.statusCode >= 200
      && event.node.res.statusCode < 300
    if (!isProtectedRequest || !isSuccess) {
      return
    }
    const config = useRuntimeConfig()
    const badTries = Math.max(0, (event.context.visitorData?.badTries ?? 0) - 1)
    await redis.set(
      event.context.visitor.id,
      JSON.stringify({
        ...event.context.visitorData,
        lastRequestTime: event.context.requestTime,
        badTries
      } satisfies H3EventContext['visitor']['data']),
      'EX',
      config.rateLimit.visitorDataMaxAgeSeconds,
    )
  });
});
