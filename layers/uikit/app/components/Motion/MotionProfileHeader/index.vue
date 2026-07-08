<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UContainer
    :ui="{
      base: 'w-full flex flex-row'
    }"
  >
    <Motion
      v-if="!!avatar?.src || !!avatar?.alt"
      :initial="{
        scale: 1.1,
        opacity: 0.3,
        filter: 'blur(20px)'
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      }"
      :transition="{
        duration: 0.6
      }"
    >
      <UAvatar
        class="size-50 ring ring-default ring-offset-3 ring-offset-bg"
        :srcset="avatarSrcset"
        :alt="avatar?.alt"
        :src="avatar?.src"
      />
    </Motion>
    <div class="w-full flex flex-col gap-4 items-center">
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0.3,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6
        }"
      >
        <h2>{{ title }}</h2>
      </Motion>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3
        }"
      >
        <h5 class="text-muted">
          {{ description }}
        </h5>
      </Motion>
      <Motion
        v-if="!!openTo"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5
        }"
      >
        <div
          class="flex items-center gap-2"
        >
          <UButton
            :color="openTo.isOpen ? 'success' : 'error'"
            variant="soft"
            class="gap-2"
            :to="openTo.isOpen ? openTo.meetingLink : ''"
            :label="openTo.isOpen ? openTo.label : t('NotAvailableNow')"
            :disabled="!openTo.isOpen"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="openTo.isOpen ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="openTo.isOpen ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>
      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of links"
          :key="index"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1
          }"
        >
          <UButton
            v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
          />
        </Motion>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { SocialLink } from '~~/layers/core/app/types/socialLinks'

const { t } = useI18n()

const props = defineProps<{
  avatar?: {
    src: string
    alt?: string
  }
  title: string
  description: string
  links: SocialLink[]
  openTo?: {
    label: string
    isOpen: boolean
    meetingLink: string
  }
}>()

const img = useImage()
const avatarSrcset = props?.avatar?.src
  ? img.getSizes(props.avatar.src, {
    sizes: 'sm:200px md:200px lg:200px xl:200px',
    modifiers: { fit: 'cover', format: 'webp', quality: 80 }
  }).srcset
  : undefined
</script>
