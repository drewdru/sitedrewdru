<template>
  <!-- <UPageHero
    :ui="{
      container: 'p-0 sm:px-0 lg:px-0 sm:py-0 lg:py-0',
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
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
          class="size-30 ring ring-default ring-offset-3 ring-offset-bg"
          :srcset="avatarSrcset"
          :alt="avatar?.alt"
          :src="avatar?.src"
        />
      </Motion>
    </template>

    <template #title>
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
        {{ title }}
      </Motion>
    </template>

    <template #description>
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
        {{ description }}
      </Motion>
    </template>

    <template #links>
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
          delay: 0.5
        }"
      >
        <div
          class="flex items-center gap-2"
        >
          <UButton
            :color="global.openToWork ? 'success' : 'error'"
            variant="soft"
            class="gap-2"
            :to="global.openToWork ? global.meetingLink : ''"
            :label="global.openToWork ? 'Open to work' : 'Not available at the moment'"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="global.openToWork ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="global.openToWork ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <!-- <Motion
          v-for="(link, index) of footer?.links"
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
    </template>
  </UPageHero> -->
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
            :color="global.openToWork ? 'success' : 'error'"
            variant="soft"
            class="gap-2"
            :to="global.openToWork ? global.meetingLink : ''"
            :label="global.openToWork ? 'Open to work' : 'Not available at the moment'"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="global.openToWork ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="global.openToWork ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>
      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
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
const { global } = useAppConfig()

const props = defineProps<{
  avatar?: {
    src: string
    alt?: string
  }
  title: string
  description: string
}>()

const img = useImage()
const avatarSrcset = props?.avatar?.src
  ? img.getSizes(props.avatar.src, {
    sizes: 'sm:200px md:200px lg:200px xl:200px',
    modifiers: { fit: 'cover', format: 'webp', quality: 80 }
  }).srcset
  : undefined

const footer = {
  links: [{
    'icon': 'i-simple-icons-telegram',
    'to': 'https://t.me/DrewDru',
    'target': '_blank',
    'aria-label': 'Telegram'
  }, {
    'icon': 'i-simple-icons-github',
    'to': 'https://github.com/drewdru',
    'target': '_blank',
    'aria-label': 'Github'
  }, {
    'icon': 'i-simple-icons-habr',
    'to': 'https://career.habr.com/drew-dru',
    'target': '_blank',
    'aria-label': 'Habr'
  }, {
    'icon': 'i-simple-icons-linkedin',
    'to': 'https://www.linkedin.com/in/andrew-ovsyannikov-b97479169',
    'target': '_blank',
    'aria-label': 'LinkedIn'
  }, {
    'icon': 'i-simple-icons-upwork',
    'to': 'https://www.upwork.com/freelancers/~01e59297900f2b4845',
    'target': '_blank',
    'aria-label': 'Upwork'
  }, {
    'icon': 'i-simple-icons-stackoverflow',
    'to': 'https://stackoverflow.com/users/7806925/drew-dru',
    'target': '_blank',
    'aria-label': 'StackOverflow'
  }, {
    'icon': 'i-simple-icons-gmail',
    'to': 'mailto:drewdrux@gmail.com',
    'target': '_blank',
    'aria-label': 'Gmail'
  }]
}
</script>
