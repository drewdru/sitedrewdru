<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UPage class="dev-page">
    <UPageBody>
      <UContainer>
        <UPageGrid>
          <UCard :ui="{body: 'sm:p-0 p-0', footer: 'sm:p-0 p-0'}">
            <template #header>
              <NuxtLink
                to="https://manetalk.com"
                target="_blank"
                external
                class="group inline-flex items-center gap-2 text-toned hover:text-primary transition-colors"
              >
                <UIcon name="i-lucide-link" />
                <span class="font-heading font-semibold text-2xl">
                  ManeTalk
                </span>
              </NuxtLink>
            </template>
            <template #default>
              <MotionZoomImg 
                src="/img/devpreview/manetalk.png"
                alt="Manetalk home page"
                :size="{ xs: 300, sm: 610, md: 500, xl: 384, lg: 384 }"
                lazy
              />
            </template>
            <template #footer>
              <UButton
                variant="ghost"
                class="w-full justify-center"
                @click="() => { open = true }"
              >
                {{t('ReadMore')}}
              </UButton>
            </template>
          </UCard>
        </UPageGrid>
      </UContainer>
      <UContainer class="text-center text-2xl">
        {{t('SeeMoreProjects')}}
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
      >
        <template #title>
          ManeTalk
        </template>
        <template #body>
          <div class="w-full flex flex-col gap-2">
            <div>
              {{ t('Site') }}:
              <NuxtLink
                to="https://manetalk.com"
                target="_blank"
                external
                class="group inline-flex items-center gap-2 text-toned hover:text-primary transition-colors"
              >
                <UIcon name="i-lucide-link" />
                <span class="font-heading font-semibold">
                  ManeTalk
                </span>
              </NuxtLink>
            </div>
            <div>
              {{ t('Skills') }}: NestJS, Vue.js, Nuxt, Electron, RabbitMQ, Kafka, Docker, Godot, PostgreSQL, MinIO
            </div>
            <div>
              {{ t('Overview') }}: {{ t('ManeTalkOverview') }}
            </div>
          </div>
        </template>
      </UModal>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const open = ref(false)
</script>
