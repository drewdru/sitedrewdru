import type { EditSchema } from '~~/shared/schemas/guestbook/messages'

export const fetchEditMessage = async (body: EditSchema) => {
  const response = await fetch('/api/v1/guestbook/messages', {
    method: 'PATCH',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
}
