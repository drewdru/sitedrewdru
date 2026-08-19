import { createI18n } from 'vue-i18n'

import en from '~~/i18n/telegram/en'
import ru from '~~/i18n/telegram/ru'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    ru
  }
})

export const getBotTranslator = (locale: 'en' | 'ru') => {
  return (key: string) => i18n.global.t(key, {}, { locale })
}
