<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UPage class="dev-page">
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <UCard
            v-for="project in projects"
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
              <MotionZoomImg
                :src="project?.preview.src"
                :alt="project?.preview.alt"
                :size="{ xs: 300, sm: 610, md: 500, xl: 384, lg: 384 }"
                lazy
              />
            </template>
            <template #footer>
              <UButton
                variant="ghost"
                class="w-full justify-center"
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

const open = ref(false)

interface Project {
  link: {
    to: string
    target: string
    external: boolean
  }
  title: string
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
  skills: 'NestJS, Vue.js, Nuxt, Electron, RabbitMQ, Kafka, Docker, Godot, PostgreSQL, MinIO',
  overview: t('ManeTalkOverview'),
  preview: {
    src: '/img/devpreview/manetalk.png',
    alt: t('ManetalkPreviewAlt')
  }
} satisfies Project]))

const showModal = (project: Project) => {
  modalData.value = project
  open.value = true
}
</script>
