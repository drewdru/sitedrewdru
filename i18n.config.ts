export default defineI18nConfig(() => {
  return {
    nonExplicitSupportedLngs: true,
    legacy: false,
    locale: 'en',
    defaultLocale: 'en',
    fallbackLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      onlyOnRoot: true,
      alwaysRedirect: true
    }
  }
})
