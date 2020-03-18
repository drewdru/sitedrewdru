import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);


let language: string = 'en';
if (localStorage.getItem('language')) {
  language = localStorage.getItem('language') || 'en';
} else {
  // @ts-ignore
  const lang = window.navigator.userLanguage || window.navigator.language;
  language = lang.split('-')[0];
}

export const i18n = new VueI18n({
  locale: language,
  fallbackLocale: 'en',
  messages: {
    en: {
      English: 'English',
      Russian: 'Russian',
    },
    ru: {
      English: 'Английский',
      Russian: 'Русский',
    },
  },
});

