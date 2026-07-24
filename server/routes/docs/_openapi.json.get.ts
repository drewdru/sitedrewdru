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
      ...meta
    }
  }
  return {
    ...spec,
    servers: [] // allow both { url: 'http://127.0.0.1:3000' }, { url: 'http://localhost:3000' }
  }
})
