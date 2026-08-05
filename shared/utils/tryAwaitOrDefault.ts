export const tryAwaitOrDefault = async <T>(
  promise: Promise<T>,
  defaultValue: T | undefined | null | 'error'
): Promise<T | undefined | null | 'error'> => {
  try {
    return await promise
  } catch {
    return defaultValue
  }
}
