import { Composer, Markup, Scenes } from 'telegraf'
import type { WizardBotContext } from '../../../types'
import { telegramReply } from '../../../helpers'

export const settingsScene = new Scenes.WizardScene<WizardBotContext>(
  'settings',
  async ctx => telegramReply(ctx, ctx.t!('SceneSettings'), getMenuMarkup(ctx)),
  async ctx => telegramReply(ctx, ctx.t!('Language'), getLanguageMarkup(ctx))
)

const getMenuMarkup = (ctx: WizardBotContext) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        ctx.t!('Back'),
        'action_main'
      ),
      Markup.button.callback(
        ctx.t!('Language'),
        'action_language'
      )
    ]
  ])
}

settingsScene.action('action_main', (ctx) => {
  ctx.scene.enter('main')
})

settingsScene.action('action_language', (ctx, next) => {
  ctx.wizard.next()
  if (ctx.wizard.step) {
    return Composer.unwrap(ctx.wizard.step)(ctx, next)
  }
})

const getLanguageMarkup = (ctx: WizardBotContext) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        ctx.t!('Back'),
        'action_back'
      ),
      Markup.button.callback(
        '🇷🇺 Русский',
        'action_set_ru'
      ),
      Markup.button.callback(
        '🇺🇸 English',
        'action_set_en'
      )
    ]
  ])
}

settingsScene.action('action_back', (ctx, next) => {
  ctx.wizard.back()
  if (ctx.wizard.step) {
    return Composer.unwrap(ctx.wizard.step)(ctx, next)
  }
})

settingsScene.action('action_set_ru', (ctx) => {
  ctx.session.state!.lang = 'ru' as const
  ctx.t = getBotTranslator('ru')
  ctx.scene.enter('main')
})

settingsScene.action('action_set_en', (ctx) => {
  ctx.session.state!.lang = 'en'
  ctx.t = getBotTranslator('en')
  ctx.scene.enter('main')
})

export default settingsScene
