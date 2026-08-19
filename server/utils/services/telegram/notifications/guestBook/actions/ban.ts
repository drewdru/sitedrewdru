import { Markup, type Telegraf } from 'telegraf'
import type { WizardBotContext } from '../../../types'
import { telegramReply } from '../../../helpers'

export const registerBan = (
  bot: Telegraf<WizardBotContext>
) => {
  bot.action(/^guestbook:ban:(.+)$/, async (ctx) => {
    try {
      const [, messageId] = ctx.match
      const data = await prisma.guestbookMessage.delete({
        where: { id: messageId }
      })
      const visitorStringData = await redis.get(data.visitorId)
      let visitorData = safeJsonParse<H3EventContext['visitor']['data']>(visitorStringData)
      visitorData ??= {
        lastRequestTime: Date.now(),
        badTries: 0,
        badRecaptchaTries: 0,
        banned: true,
        reason: 'manual'
      }
      await redis.set(
        data.visitorId,
        JSON.stringify(visitorData),
        'EX',
        604800
      )
    } finally {
      telegramReply(ctx, 'Visitor banned', Markup.removeKeyboard())
    }
  })
}
