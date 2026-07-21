<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UPage class="cv-page">
    <UPageHeader>
      <MotionProfileHeader
        :avatar="{
          alt: t('AndrewOvsyannikov'),
          src: '/img/avatars/andrei_ovsiannikov.png'
        }"
        :title="t('HelloFromAndrew')"
        description="Software Architect • Full-Stack Developer • Technical Lead"
        :links="careerSocialLinks"
        :open-to="{
          label: t('OpenToWork'),
          isOpen: global.openToWork,
          meetingLink: global.workMeetingLink
        }"
        :document="{
          label: t('DownloadCv'),
          src: '/docs/CV_Ovsyannikov_A.K..pdf'
        }"
      />
    </UPageHeader>
    <UPageBody>
      <template v-if="pageContent">
        <ContentRenderer
          class="space-y-6"
          :value="pageContent"
        />
      </template>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import { careerSocialLinks } from '~~/layers/core/app/utils/constants/socialLinks/careerSocialLinks'
import { useContentByLocale } from '~~/layers/core/app/composables/contentByLocale'

const { t, locale } = useI18n()
const { global } = useAppConfig()

const { data: pageContent } = await useContentByLocale('profile', 'andrew_ovsyannikov', locale)
</script>
