import { Markup, Scenes } from 'telegraf'
import type { WizardBotContext } from '../../../types'
import { telegramReply } from '../../../helpers'

export const profileScene = new Scenes.WizardScene<WizardBotContext>(
  'profile',
  async ctx => telegramReply(ctx, `${ctx.t!('SceneProfile')}
id: ${ctx.from?.id}
username: ${ctx.from?.username}
first_name: ${ctx.from?.first_name}
last_name: ${ctx.from?.last_name}
is_bot: ${ctx.from?.is_bot}
is_premium: ${ctx.from?.is_premium}
language_code: ${ctx.from?.language_code}
added_to_attachment_menu: ${ctx.from?.added_to_attachment_menu}
session: ${JSON.stringify(ctx.session)}
`, getMenuMarkup(ctx))
)

const getMenuMarkup = (ctx: WizardBotContext) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        ctx.t!('Back'),
        'action_main'
      )
    ]
  ])
}

profileScene.action('action_main', (ctx) => {
  ctx.scene.enter('main')
})
