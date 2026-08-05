export const fetchVisitor = async () => {
  const response = await fetch(`/api/v1/visitor`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
  return await response.json()
}
