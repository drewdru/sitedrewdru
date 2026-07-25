export const capitalize = (data: string) => {
  return data.charAt(0).toUpperCase() + data.slice(1)
}

export const safeJsonParse = <T>(str: string) => {
  try {
    const jsonValue: T = JSON.parse(str)
    return jsonValue
  } catch {
    return undefined
  }
}
