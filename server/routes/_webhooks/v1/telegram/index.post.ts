import { forbiddenError } from '~~/server/utils/errors'
import { bot } from '~~/server/utils/telegram'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = event.headers.get('X-Telegram-Bot-Api-Secret-Token')
  if (token !== config.telegram.webhookToken) {
    throw forbiddenError('INVALID_SESSION')
  }
  const body = await readBody(event)
  try {
    await bot.handleUpdate(body)
  } catch (error) {
    console.error(error)
  }
  return { ok: true }
})
