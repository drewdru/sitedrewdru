import en from './en';
import ru from './ru';

import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);


let language: string = 'en';
if (localStorage.getItem('language')) {
  language = localStorage.getItem('language') || 'en';
} else {
  const lang = (window as any).navigator.userLanguage || (window as any).navigator.language;
  language = lang.split('-')[0];
}

export const i18n = new VueI18n({
  locale: language,
  fallbackLocale: 'en',
  messages: {en, ru},
  silentTranslationWarn: true,
});

