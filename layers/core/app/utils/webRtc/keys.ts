export const getConnectionKey = (gameId: string, roomId: string, peerRole: string) => {
  return `game:${gameId}:room:${roomId}:role:${peerRole}`
}
