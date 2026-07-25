export const delay = async (ms: number) => {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

export const randomDelay = async (min: number, max: number) => {
  await delay(Math.floor(Math.random() * (max - min + 1)) + min)
}
