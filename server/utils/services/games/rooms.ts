export const roomKey = (gameId: string, roomId: string) => {
  return `game:${gameId}:room:${roomId}`
}
