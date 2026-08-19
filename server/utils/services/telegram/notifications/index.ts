import type { Telegraf } from 'telegraf'
import type { WizardBotContext } from '../types'

import { registerGuestbookHandlers } from './guestBook'

export const registerNotificationsActionsHandlers = (
  bot: Telegraf<WizardBotContext>
) => {
  registerGuestbookHandlers(bot)
}
