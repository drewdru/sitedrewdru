<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UContainer>
    <MotionCard :delay="cardsDelay">
      <MDC
        v-if="content"
        :value="content"
      />
    </MotionCard>
  </UContainer>
</template>

<script setup lang="ts">
import MotionCard from '~~/layers/uikit/app/components/Motion/MotionCard/index.vue'
import { careerSocialLinks } from '~~/layers/core/app/utils/socialLinks/careerSocialLinks'

const cardsDelay = careerSocialLinks.length * 0.1

defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>
