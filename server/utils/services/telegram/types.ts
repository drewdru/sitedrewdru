import type { Scenes } from 'telegraf'

interface SessionState {
  lang: 'en' | 'ru'
}
export type SessionData = Scenes.WizardSessionData & SessionState

export interface WizardBotContext extends Scenes.WizardContext<SessionData> {
  t?: (key: string) => string
  session: Scenes.WizardContext<SessionData>['session'] & { state?: SessionState }
}
