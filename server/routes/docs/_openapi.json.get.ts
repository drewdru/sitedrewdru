export default defineEventHandler(async () => {
  const spec = await $fetch('/_openapi.json')
  if (!spec) {
    return {}
  }
  const registry = getApiMetaRegistry()
  for (const [key, meta] of registry) {
    const [methodUpper, path] = key.split(' ')
    if (!methodUpper || !path) {
      continue
    }
    const method = methodUpper.toLowerCase()
    if (!spec.paths[path]?.[method]) {
      continue
    }
    spec.paths[path][method] = {
      ...spec.paths[path][method],
      ...meta,
      security: meta.security ?? spec.paths[path][method].security
    }
  }
  return {
    ...spec,
    servers: [{ url: '' }, { url: 'http://127.0.0.1:3000' }, { url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        serverApiKey: {
          description: 'SSR server API key',
          type: 'apiKey',
          name: 'authorization',
          in: 'header'
        }
      }
    }
  }
})
