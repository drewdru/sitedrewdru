import { constants } from 'node:http2'
import { z } from 'zod/v4'
import { forbiddenError } from '~~/server/utils/errors'

import { validateRouterParams } from '~~/server/utils/validators/pathParams'

const paramsSchema = z.object({
  username: z.string().meta({
    description: 'LastFm username',
    example: 'username'
  })
})

const responseSchema = z.object({
  '@attr': z.object({
    user: z.string(),
    totalPages: z.string(),
    page: z.string(),
    perPage: z.string(),
    total: z.string()
  }).optional(),
  'recenttracks': z.object({
    track: z.array(z.object({
      'artist': z.object({ '#text': z.string() }).optional(),
      'name': z.string(),
      'image': z.array(z.object({ '#text': z.string() })).optional(),
      'url': z.string(),
      '@attr': z.object({
        nowplaying: z.string()
      }).optional()
    }))
  })
})

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    if (event.context.authorization !== config.webhooks.serverApiKey) {
      throw forbiddenError('INVALID_SESSION')
    }
    const { username } = await validateRouterParams(event, paramsSchema)

    try {
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${
          username
        }&api_key=${
          config.lastFm.apiKey
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
      const data = await response.json() as Response
      return responseSchema.parse(data)
    } catch (error) {
      console.error('Error fetching Last FM data:', error)
      return {
        'recenttracks': {
          track: []
        },
        '@attr': {
          user: username,
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
    name: `lastfm_user_tracks`,
    getKey: (event) => {
      const config = useRuntimeConfig()
      const isAllow = event.context.authorization === config.webhooks.serverApiKey
      const username = getRouterParam(event, 'username')!
      return `username:${isAllow ? username : ''}`
    }
  }
)

defineRouteMeta({
  openAPI: {
    tags: ['_webhooks / v1 / lastfm / user'],
    summary: 'Get recent Last.fm tracks',
    description: 'Returns recent tracks listened by a Last.fm user'
  }
})

defineApiMeta(
  'GET /_webhooks/v1/lastfm/user/{username}',
  {
    security: [{ serverApiKey: [] }],
    params: zodToOpenApiSchema(paramsSchema),
    responses: {
      [constants.HTTP_STATUS_OK]: zodToOpenApiSchema(responseSchema)
    }
  }
)
