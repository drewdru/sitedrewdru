<i18n locale="en" lang="yaml">
404NotFound: 404 Not Found
WeCouldntFindPage: We couldn't find the page you were looking for.
GoToHomepage: Go to Homepage
500ServerError: 500 Server Error
ServerCantBeReached: Oops! Server can't be reached.
</i18n>

<i18n locale="cn" lang="yaml">
404NotFound: 404 找不到
WeCouldntFindPage: 我们无法找到您要查找的页面。
GoToHomepage: 转到主页
500ServerError: 500 服务器错误
ServerCantBeReached: 哎呀！服务器无法连接。
</i18n>

<i18n locale="ru" lang="yaml">
404NotFound: 404 Не найдено
WeCouldntFindPage: Мы не смогли найти нужную вам страницу.
GoToHomepage: Перейти на главную
500ServerError: 500 Ошибка сервера
ServerCantBeReached: Упс! Невозможно связаться с сервером.
</i18n>

<template>
  <UPageHero
    :title="error?.status === 404 ? t('404NotFound') : t('500ServerError')"
    :description="error?.status === 404 ? t('WeCouldntFindPage') : t('ServerCantBeReached')"
    :links="[{
      label: t('GoToHomepage'),
      to: domainUrl('/'),
      trailingIcon: 'i-lucide-arrow-right',
      size: 'xl'
    }]"
    :ui="{
      title: 'font-heading'
    }"
  />
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app'

defineProps({
  error: Object as () => NuxtError
})

const domainUrl = useCurrentDomainUrl()
const route = useRoute()
const { t, defaultLocale, setLocale, localeCodes } = useI18n()

const localeFromPath = computed(() => {
  const maybeLocale = route.fullPath.split('/')[1] as typeof defaultLocale | undefined
  return maybeLocale && localeCodes.value.includes(maybeLocale)
    ? maybeLocale
    : defaultLocale || 'en'
})

watchEffect(() => {
  setLocale(localeFromPath.value)
})
</script>
