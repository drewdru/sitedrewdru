import { z } from 'zod/v4'

import { validateRouterParams } from '~~/server/utils/validators/pathParams'

const paramsSchema = z.object({
  username: z.string().meta({
    description: 'LastFm username',
    example: 'username'
  })
})

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const { username } = await validateRouterParams(event, paramsSchema)

    try {
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${
          username
        }&api_key=${
          config.lastFmApiKey
        }&format=json`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': config.profileApiToken
          }
        }
      )
      await validateFetchResponse(response)
      return await response.json()
    } catch (error) {
      console.error('Error fetching Last FM data:', error)
      return {
        'recenttracks': {
          track: []
        },
        '@attr': {
          user: 'drew-dru',
          totalPages: '0',
          page: '1',
          perPage: '50',
          total: '0'
        }
      }
    }
  },
  {
    maxAge: 120,
    staleMaxAge: 300,
    name: `lastfm_user`,
    getKey: (event) => {
      return getRouterParam(event, 'username')!
    }
  }
)

defineRouteMeta({
  openAPI: {
    tags: ['API / v1 / lastfm / user'],
    summary: 'Get recent Last.fm tracks',
    description: 'Returns recent tracks listened by a Last.fm user',
    parameters: [
      {
        name: 'username',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Recent tracks'
      }
    }
  }
})
