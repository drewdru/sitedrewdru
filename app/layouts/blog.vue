<i18n locale="en" lang="yaml" src="~~/layers/core/app/utils/constants/navigation/locales/en.yml" />

<i18n locale="ru" lang="yaml" src="~~/layers/core/app/utils/constants/navigation/locales/ru.yml" />

<template>
  <div class="h-screen flex flex-col lg:overflow-hidden overflow-auto">
    <UMain class="h-full">
      <UPageHero
        class="h-full"
        :ui="{
          title: 'font-heading',
          container: 'py-0 sm:py-0 lg:py-0 sm:px-0 lg:px-4',
          body: 'p-0 my-5'
        }"
      >
        <template #top>
          <UContainer class="flex justify-center p-2">
            <AppLogoWithText
              class="h-6 w-auto text-current group-hover:text-primary transition-colors"
              to="/welcome"
            />
          </UContainer>
        </template>
        <template #body>
          <UPage
            class="h-full"
            :ui="{
              root: 'lg:gap-0',
              left: 'order-1 lg:p-0 lg:pl-4 lg:width-[13rem]',
              center: 'order-2 lg:px-4',
              right: 'order-3 lg:p-0 lg:width-[13rem]'
            }"
          >
            <template #left>
              <UContainer class="flex flex-col justify-between">
                <UPageAnchors
                  :links="blogLinks"
                  :ui="{
                    list: 'flex flex-row flex-wrap gap-x-4 gap-y-2 lg:flex-col',
                    link: 'whitespace-nowrap'
                  }"
                />
                <Kyusha v-if="!isHomePage" />
              </UContainer>
            </template>
            <template #default>
              <UScrollArea
                v-if="isGuestbookPage || isGalleryPage"
                ref="scrollArea"
                :key="route.path"
                shadow
                class="p-1 sm:p-1 md:p-1 lg:p-1 h-full lg:h-[calc(100vh-9rem)]"
                :ui="{ viewport: 'blog-scrollArea-viewport gap-4 p-1 lg:p-1' }"
              >
                <slot />
              </UScrollArea>
              <MotionCard
                v-else
                class="my-5 lg:my-0 px-0 lg:px-1"
                :bubble-right="true"
                card-body-class="lg:px-0"
              >
                <UScrollArea
                  ref="scrollArea"
                  :key="route.path"
                  shadow
                  class="px-1 sm:px-1 md:px-1 lg:px-1 h-full lg:h-[calc(100vh-12rem)]"
                  :ui="{ viewport: 'blog-scrollArea-viewport gap-4 lg:px-6' }"
                >
                  <slot />
                </UScrollArea>
              </MotionCard>
            </template>
            <template #right>
              <UContainer
                :ui="{
                  base: 'w-full flex flex-col gap-4'
                }"
              >
                <UContainer class="w-full flex justify-center">
                  <DrewDruAvatar :is-person="isAboutPage" />
                </UContainer>
                <UScrollArea
                  shadow
                  class="sm:p-1 md:p-1 lg:p-1 h-full lg:h-[calc(100vh-17.5rem)] min-h-[10rem]"
                  :ui="{ viewport: 'gap-4', root: 'p-1 sm:p-1 md:p-1 lg:p-1' }"
                >
                  <NowListening />
                  <UContainer class="flex flex-row justify-center">
                    <img
                      class="max-h-[10rem]"
                      src="~/assets/img/animations/drewkisser.webp"
                      alt="Drew Dru dancing animation by Bakery: [Telegram](https://t.me/bakery_3112), [VK](https://vk.com/bakery_3112), [VK donut](https://vk.com/donut/bakery_3112), [Derpibooru](https://derpibooru.org/profiles/Bakery), [X](https://x.com/Bakery3112), [Boosty](https://boosty.to/bakery3112)"
                    >
                  </UContainer>
                </UScrollArea>
              </UContainer>
            </template>
          </UPage>
        </template>
        <template #bottom>
          <UFooter>
            <template #left>
              <p class="text-sm text-toned">
                Drew Dru © {{ new Date().getFullYear() }}
              </p>
            </template>

            <template #default>
              <div class="flex flex-row">
                <UButton
                  v-for="(link, index) of personalSocialLinks"
                  :key="index"
                  v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
                />
              </div>
            </template>

            <template #right>
              <ULocaleSelect
                variant="ghost"
                :model-value="locale"
                :locales="(locales as Locale<any>[])"
                :ui="{
                  trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                }"
                @update:model-value="setLocale($event as typeof locale)"
              />
              <UColorModeButton />
            </template>
          </UFooter>
        </template>
      </UPageHero>
    </UMain>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@nuxt/ui'
import { personalSocialLinks } from '~~/layers/core/app/utils/constants/socialLinks/personalSocialLinks'
import { blogNavigation } from '~~/layers/core/app/utils/constants/navigation/blogNavigation'

const localePath = useLocalePath()
const { t, locale, setLocale, locales } = useI18n()
const route = useRoute()
const scrollArea = useTemplateRef('scrollArea')

provide('scrollToTop', async () => {
  scrollArea.value?.$el?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const isHomePage = computed(() => route.name?.toString().startsWith('index'))
const isAboutPage = computed(() => route.name?.toString().startsWith('about'))
const isGuestbookPage = computed(() => route.name?.toString().startsWith('guestbook'))
const isGalleryPage = computed(() => route.name?.toString().startsWith('gallery'))

const blogLinks = computed(() =>
  blogNavigation.map(item => ({
    ...item,
    label: t(item.label),
    to: localePath(item.to)
  }))
)

useHead({
  htmlAttrs: { lang: locale.value },
  titleTemplate: 'Drew Dru - %s',
  bodyAttrs: {
    class: 'magic-body'
  }
})
</script>

<style lang="scss">
@use '~/assets/scss/backgrounds/magicBody.scss';
</style>
