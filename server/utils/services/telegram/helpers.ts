import type { Markup } from 'telegraf'

export const telegramReply = async (ctx: WizardBotContext, text: string, markup: Markup.Markup<InlineKeyboardMarkup | ReplyKeyboardRemove>) => {
  if (ctx.callbackQuery) {
    await safeAwait(ctx.answerCbQuery(), undefined)
    try {
      return await ctx.editMessageText(text, markup)
    } catch {
      return await ctx.reply(text, markup)
    }
  }
  return await ctx.reply(text, markup)
}
