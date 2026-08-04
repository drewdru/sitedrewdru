import type { BodySchema } from '~~/shared/schemas/guestbook/messages'

export const fetchPostMessage = async (body: BodySchema) => {
  const response = await fetch('/api/v1/guestbook/messages', {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
  return await response.json()
}
