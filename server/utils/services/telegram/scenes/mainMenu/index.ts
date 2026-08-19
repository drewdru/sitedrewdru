import { Markup, Scenes } from 'telegraf'
import type { WizardBotContext } from '../../types'
import { telegramReply } from '../../helpers'
import { settingsScene } from './settings'
import { profileScene } from './profile'

export const mainMenuScene = new Scenes.WizardScene<WizardBotContext>(
  'main',
  async ctx => telegramReply(ctx, ctx.t!('SceneMainMenu'), getMenuMarkup(ctx))
)

const getMenuMarkup = (ctx: WizardBotContext) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        ctx.t!('SceneSettings'),
        'action_settings'
      ),
      Markup.button.callback(
        ctx.t!('SceneProfile'),
        'action_profile'
      )
    ]
  ])
}

mainMenuScene.action('action_settings', ctx =>
  ctx.scene.enter('settings')
)

mainMenuScene.action('action_profile', ctx =>
  ctx.scene.enter('profile')
)

export const mainMenuStage = [
  mainMenuScene,
  settingsScene,
  profileScene
]
