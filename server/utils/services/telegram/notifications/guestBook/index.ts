import type { Telegraf } from 'telegraf'
import type { WizardBotContext } from '../../types'
import { registerDelete } from './actions/delete'
import { registerBan } from './actions/ban'

export const registerGuestbookHandlers = (
  bot: Telegraf<WizardBotContext>
) => {
  registerDelete(bot)
  registerBan(bot)
}
