export const fetchMessages = async (page: number) => {
  const response = await fetch(`/api/v1/guestbook/messages?page=${page}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
  return await response.json()
}
