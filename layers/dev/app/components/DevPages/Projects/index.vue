<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UPage class="dev-page">
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <UCard
            v-for="project in projects"
            class="h-max"
            :key="project.title"
            :ui="{
              body: 'sm:p-0 p-0',
              footer: 'sm:p-0 p-0',
              header: 'flex flex-row justify-center'
            }"
          >
            <template #header>
              <NuxtLink
                v-bind="{ ...project?.link }"
                class="group inline-flex items-center gap-2 text-toned hover:text-primary transition-colors"
              >
                <UIcon name="i-lucide-link" />
                <span class="font-heading font-semibold text-2xl">
                  {{ project?.title }}
                </span>
              </NuxtLink>
            </template>
            <template #default>
              <div class="w-full flex flex-col">
                <MotionZoomImgPreview
                  img-class="!cursor-pointer"
                  :src="project?.preview.src"
                  :alt="project?.preview.alt"
                  :size="{ xs: 300, sm: 610, md: 500, xl: 384, lg: 384 }"
                  lazy
                  @open="showModal(project)"
                />
                <span class="p-2">
                  {{ project?.description }}
                </span>
              </div>
            </template>
            <template #footer>
              <UButton
                variant="ghost"
                class="w-full justify-center p-2"
                @click="showModal(project)"
              >
                {{ t('ReadMore') }}
              </UButton>
            </template>
          </UCard>
        </UPageGrid>
      </UContainer>
      <UContainer class="text-center text-2xl">
        {{ t('SeeMoreProjects') }}
        <NuxtLink
          to="https://github.com/drewdru"
          target="_blank"
          external
          class="group inline-flex items-center gap-2 text-toned hover:text-primary transition-colors"
        >
          <UIcon name="i-simple-icons-github" />
          <span class="font-semibold">
            GitHub
          </span>
        </NuxtLink>
      </UContainer>
      <UModal
        v-model:open="open"
        :ui="{
          header: 'justify-center',
          footer: 'justify-center'
        }"
        class="md:max-w-[90vw] xl:max-w-[90vw] lg:max-w-[90vw]"
      >
        <template #title>
          {{ modalData?.title }}
        </template>
        <template #body>
          <div class="w-full flex flex-col gap-2">
            <div>
              {{ t('Skills') }}: {{ modalData?.skills }}
            </div>
            <div>
              {{ t('Overview') }}: {{ modalData?.overview }}
            </div>
            <MotionZoomImg
              v-if="modalData?.preview?.src"
              :src="modalData?.preview.src"
              :alt="modalData?.preview.alt"
              :size="{ xs: 300, sm: 640, md: 768, lg: 1024, xl: 1280 }"
              lazy
            />
          </div>
        </template>
        <template #footer>
          <UButton
            variant="solid"
            icon="i-lucide-link"
            :to="modalData?.link.to"
            :external="modalData?.link.external"
            :target="modalData?.link.target"
          >
            {{ t('OpenProject') }} {{ modalData?.title }}
          </UButton>
        </template>
      </UModal>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const open = ref(false)

interface Project {
  link: {
    to: string
    target: string
    external: boolean
  }
  title: string
  description: string
  skills: string
  overview: string
  preview: {
    src: string
    alt: string
  }
}
const modalData = ref<Project | null>(null)
const projects = computed(() => ([{
  link: {
    to: 'https://manetalk.com',
    target: '_blank',
    external: true
  },
  title: 'ManeTalk',
  description: t('ManetalkPreviewAlt'),
  skills: 'NestJS, Vue.js, Nuxt, Electron, RabbitMQ, Kafka, Docker, Godot, PostgreSQL, MinIO',
  overview: t('ManeTalkOverview'),
  preview: {
    src: '/img/devpreview/manetalk.png',
    alt: t('ManetalkPreviewAlt')
  }
}, {
  link: {
    to: localePath('/projects/games/pong'),
    target: '_blank',
    external: true
  },
  title: 'Pong',
  description: t('PongPreviewAlt'),
  skills: 'Vue.js, Nuxt 4, WebRTC, Godot, Docker, Redis',
  overview: t('PongOverview'),
  preview: {
    src: '/img/devpreview/pong.png',
    alt: t('PongPreviewAlt')
  }
} satisfies Project]))

const showModal = (project: Project) => {
  modalData.value = project
  open.value = true
}
</script>
