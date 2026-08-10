export const fetchJoinRoom = async (gameId: string, roomId: string): Promise<void> => {
  const response = await fetch(`/api/v1/games/${gameId}/rooms/${roomId}/join`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
}
