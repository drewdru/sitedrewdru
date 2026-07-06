<template>
  <UPage class="cv-page">
    <UPageHeader>
      <MotionHero
        :avatar="{
          alt: t('AndrewOvsiannikov'),
          src: '/img/avatars/andrei_ovsiannikov.png'
        }"
        :title="t('Hello, I\'m Andrew Ovsyannikov')"
        :description="t('Software Architect • Full-Stack Developer • Technical Lead')"
      />
    </UPageHeader>
    <UPageBody>
      <UContainer>
        <UCard>
          <div class="flex flex-col gap-4">
            <p class="text">
              I specialise in designing project architecture and building scalable, high-performance systems using TypeScript(Node.js, NestJS, Express), Python(FastAPI, Django), and modern front-end frameworks (Vue/Nuxt, React/Next, Angular). I’m also proficient in PostgreSQL, MongoDB, Docker, Nginx, Redis, RabbitMQ, and Kafka. I’m experienced in leading projects, machine learning integration, and performance optimization.
            </p>
            <UCollapsible class="flex flex-col gap-2 w-full">
              <UButton
                class="group"
                :label="t('View Full Skill Set')"
                variant="soft"
                trailing-icon="i-lucide-chevron-down"
                :ui="{
                  trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
                }"
                block
              />
              <template #content>
                <UTable
                  :data="[
                    { field: 'Programming languages', value: 'JavaScript, TypeScript, Python, C#, Go' },
                    { field: 'Front end', value: 'Vue, Nuxt, React, Angular, HTML, CSS, Bootstrap/Material/Tailwind' },
                    { field: 'Back end', value: 'NodeJS, Express, Nestjs, ElysiaJS, FastApi, Django/DRF, Flask' },
                    { field: 'Cloud', value: 'AWS (Amplify, Lambda, S3, Cognito),  Google Cloud, Azure' },
                    { field: 'DBMS/MQTT/ORM', value: 'PostgreSQL, MongoDB, MySQL, Redis, RabbitMQ, Kafka, DynamoDB, Prisma, Drizzle, TypeORM, Sequalize, SqlAlchemy' },
                    { field: 'Operating Systems', value: 'Linux, Windows' },
                    { field: 'Other technologies', value: 'Docker, Kubernetes, Nginx, Git, WebRTC, SocketIO' },
                    { field: 'Languages', value: 'Russian (Native), English (B2)' }
                  ]"
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
        </UCard>
      </UContainer>
      <UContainer>
        <UCard>
          <h3>Professional experience</h3>
          <UAccordion
            :items="[
              { label: '05/2025 to date – layer3.press – Full-stack Developer', content: 'blah blah blah' },
              { label: '05/2025 to date – layer3.press – Tech Lead, ML Engineer, Full-stack Developer', content: 'blah blah blah' },
              { label: '05/2025 to date – layer3.press – Full-stack Developer', content: 'blah blah blah' },
              { label: '05/2025 to date – layer3.press – Lead Full-Stack Developer', content: 'blah **blah** blah' },
              { label: '05/2025 to date – layer3.press – Full-stack Developer', content: 'blah blah blah' }
            ]"
            :unmount-on-hide="false"
          >
            <template #body="{ item }">
              <MDC :value="item.content" unwrap="p" />
            </template>
          </UAccordion>
        </UCard>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import MotionHero from '~~/layers/uikit/app/components/Motion/MotionHero/index.vue'

const { t } = useI18n()
</script>
