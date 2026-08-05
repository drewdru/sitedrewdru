export const safeAwait = async <T, D>(
  promise: Promise<T>,
  defaultValue: D
): Promise<T | D> => {
  try {
    return await promise
  } catch {
    return defaultValue
  }
}
