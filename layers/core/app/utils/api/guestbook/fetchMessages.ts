import type { ResponseGetSchema } from '~~/shared/schemas/guestbook/messages'

export const fetchMessages = async (page: number): Promise<ResponseGetSchema> => {
  const response = await fetch(`/api/v1/guestbook/messages?page=${page}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
  return await response.json()
}
