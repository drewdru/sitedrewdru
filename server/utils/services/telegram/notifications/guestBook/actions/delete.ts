import { Markup, type Telegraf } from 'telegraf'
import type { WizardBotContext } from '../../../types'
import { telegramReply } from '../../../helpers'

export const registerDelete = (
  bot: Telegraf<WizardBotContext>
) => {
  bot.action(/^guestbook:delete:(.+)$/, async (ctx) => {
    try {
      const [, messageId] = ctx.match
      await prisma.guestbookMessage.delete({
        where: { id: messageId }
      })
    } finally {
      await telegramReply(ctx, 'Message deleted', Markup.removeKeyboard())
    }
  })
}
