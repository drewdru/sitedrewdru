import type { CreateRoomResponseSchema } from '~~/shared/schemas/games/rooms/create'

export const fetchCreateRoom = async (gameId: string): Promise<CreateRoomResponseSchema> => {
  const response = await fetch(`/api/v1/games/${gameId}/rooms`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await validateFetchResponse(response)
  return await response.json()
}
