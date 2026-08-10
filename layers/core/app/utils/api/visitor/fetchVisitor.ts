import type { ResponseGetSelfSchema } from '~~/shared/schemas/visitor'

export const fetchVisitor = async (): Promise<ResponseGetSelfSchema> => {
  const response = await fetch(`/api/v1/visitor`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
  return await response.json()
}
