import { Scenes } from 'telegraf'
import { mainMenuStage } from './scenes/mainMenu'
import type { WizardBotContext } from './types'

export const stage = new Scenes.Stage<WizardBotContext>(mainMenuStage)
