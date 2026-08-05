import type { H3Event } from '#imports'

export const validateRecaptcha = async (event: H3Event, captcha?: string) => {
  if (!captcha) {
    throw forbiddenError()
  }
  const config = useRuntimeConfig()
  try {
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${config.google.projectId}/assessments?key=${config.google.apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          event: {
            token: captcha,
            siteKey: config.public.google.recaptcha.v2SiteKey,
            userIpAddress: event.context.realIp,
            userAgent: event.context.userAgent
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'charset': 'UTF-8'
        }
      }
    )
    await validateFetchResponse(response)
    const result:
      | {
        tokenProperties?: {
          valid?: boolean
        }
      }
      | undefined = await response.json()
    if (!result?.tokenProperties?.valid) {
      throw new Error('Invalid token')
    }
    event.context.visitor.data.badRecaptchaTries = Math.max(0, event.context.visitor.data.badRecaptchaTries - 1)
  } catch {
    event.context.visitor.data.badTries++
    event.context.visitor.data.badRecaptchaTries++
    const banned = event.context.visitor.data.badTries > config.rateLimit.defaultMaxRequestTries
      || event.context.visitor.data.badRecaptchaTries > config.rateLimit.maxRecaptchaErrors
    await redis.set(
      event.context.visitor.id,
      JSON.stringify({
        ...event.context.visitor.data,
        banned: banned || undefined,
        reason: 'rate-limit'
      } satisfies H3EventContext['visitor']['data']),
      'EX',
      config.rateLimit.visitorDataMaxAgeSeconds
    )
    throw forbiddenError()
  }
}
