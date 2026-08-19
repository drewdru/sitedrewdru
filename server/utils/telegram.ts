import { Telegraf, session } from 'telegraf'
import { Redis } from '@telegraf/session/redis'

import { getBotTranslator } from './services/telegram/i18n'
import { stage } from './services/telegram'
import type { WizardBotContext } from './services/telegram/types'
import { registerNotificationsActionsHandlers } from './services/telegram/notifications'

const telegrafSingleton = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN!
  const bot = new Telegraf<WizardBotContext>(token)

  bot.telegram.setWebhook(
    process.env.TELEGRAM_WEBHOOK_URL ?? '',
    {
      secret_token: process.env.TELEGRAM_WEBHOOK_SECRET ?? ''
    }
  ).catch((error) => {
    console.error(error)
  })

  const redisStore = Redis<WizardBotContext['session']>({
    url: process.env.REDIS_URL!
  })

  bot.use(session({
    store: redisStore
  }))
  bot.use(async (ctx, next) => {
    ctx.session.state ??= { lang: 'en' }
    const userLocale = (ctx.session?.state?.lang
      || ctx.from?.language_code
      || 'en') as 'en' | 'ru'
    ctx.t = getBotTranslator(userLocale)
    await next()
  })

  registerNotificationsActionsHandlers(bot)

  stage.command('start', async (ctx) => {
    await ctx.scene.enter('main')
  })
  bot.use(stage.middleware())

  return bot
}

type TelegrafBotInstance = ReturnType<typeof telegrafSingleton>

const globalForTelegraf = globalThis as unknown as {
  telegramBot: TelegrafBotInstance | undefined
}

export const bot = globalForTelegraf.telegramBot ?? telegrafSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForTelegraf.telegramBot = bot
}
