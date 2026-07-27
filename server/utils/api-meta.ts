import type { OpenAPIV3 } from 'openapi-types'

import type { ApiMetaInput } from './zod/zodToOpenApi'
import { normalizeApiMeta } from './zod/zodToOpenApi'

export interface ApiMeta {
  parameters?: OpenAPIV3.ParameterObject[]
  requestBody?: OpenAPIV3.RequestBodyObject
  responses?: OpenAPIV3.ResponsesObject
  security?: OpenAPIV3.SecurityRequirementObject[]
}

const registry = new Map<string, ApiMeta>()

export function defineApiMeta(
  key: string,
  meta: ApiMetaInput
) {
  registry.set(key, normalizeApiMeta(meta))
}

export function getApiMeta(
  key: string
) {
  return registry.get(key)
}

export function getApiMetaRegistry() {
  return registry
}
