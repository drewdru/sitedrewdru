export const getRoomKey = (gameId: string, roomId: string) => {
  return `game:${gameId}:room:${roomId}`
}
