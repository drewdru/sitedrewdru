export const randomArrayItem = <T>(arr: T[]): T | undefined =>
  arr[Math.floor(Math.random() * arr.length)]

export const randomInt = (from: number, to: number): number =>
  Math.floor(Math.random() * to) + from
