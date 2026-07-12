export const validateFetchResponse = async (response: Response) => {
  if (response.ok) {
    return
  }
  let error: unknown
  try {
    error = await response.json()
  } catch {
    const message = await response.text()
    error = { message }
  }
  throw error
}
