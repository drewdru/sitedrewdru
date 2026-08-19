import { Markup } from 'telegraf'

export const sendGuestbookMessageToTelegram = async (
  data: {
    adminId: number | string
    contact: string
    message: string
    messageId: string
    name: string
    visitorId: string
  }
) => {
  const telegramMessage = `New guestbook message

Name: ${data.name} 
Contact: ${data.contact}
visitorId: ${data.visitorId}

${data.message}`

  return bot.telegram.sendMessage(
    data.adminId,
    telegramMessage,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          '🗑 Delete',
          `guestbook:delete:${data.messageId}`
        ),
        Markup.button.callback(
          '🚫 Ban & Delete',
          `guestbook:ban:${data.messageId}`
        )
      ]
    ])
  )
}
