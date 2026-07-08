<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UContainer>
    <MotionCard :delay="cardsDelay">
      <div class="flex flex-col gap-4">
        <MDC :value="about" unwrap/>
        <UCollapsible class="flex flex-col gap-2 w-full">
          <UButton
            class="group"
            :label="t('ViewFullSkillSet')"
            variant="soft"
            trailing-icon="i-lucide-chevron-down"
            :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
            block
          />
          <template #content>
            <UTable
              :data="skills"
              :columns="[
                {
                  accessorKey: 'field',
                  header: '',
                  cell: ({ row }) => h(
                    'span',
                    { class: 'font-semibold text' },
                    row.getValue('field')
                  )
                },
                {
                  accessorKey: 'value',
                  header: ''
                }
              ]"
            />
          </template>
        </UCollapsible>
      </div>
    </MotionCard>
  </UContainer>
</template>

<script setup lang="ts">
import MotionCard from '~~/layers/uikit/app/components/Motion/MotionCard/index.vue'
import { careerSocialLinks } from '~~/layers/core/app/utils/socialLinks/careerSocialLinks'

const cardsDelay = careerSocialLinks.length * 0.1
const { t } = useI18n()

defineProps({
  about: {
    type: String,
    default: ''
  }
})

const skills = computed(() => [
  { field: t('ProgrammingLanguages'), value: 'JavaScript, TypeScript, Python, C#, Go, Rust' },
  { field: t('Frontend'), value: 'Vue, Nuxt, React, Angular, HTML, CSS, Bootstrap/Material/Tailwind' },
  { field: t('Backend'), value: 'NodeJS, Express, Nestjs, ElysiaJS, FastApi, Django/DRF, Flask' },
  { field: t('Cloud'), value: 'AWS (Amplify, Lambda, S3, Cognito),  Google Cloud, Azure' },
  { field: t('DBMSMQTTORM'), value: 'PostgreSQL, MongoDB, MySQL, Redis, RabbitMQ, Kafka, DynamoDB, Prisma, Drizzle, TypeORM, Sequalize, SqlAlchemy' },
  { field: t('OperatingSystems'), value: 'Linux, Windows' },
  { field: t('OtherTechnologies'), value: 'Docker, Kubernetes, Nginx, Git, WebRTC, SocketIO' },
  { field: t('Languages'), value: 'Russian (Native), English (B2)' }
])
</script>
