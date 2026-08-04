<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <MotionCard>
    <h3>{{ t('ProfessionalExperience') }}</h3>
    <UAccordion
      :items="items"
      :unmount-on-hide="false"
      type="multiple"
    >
      <template #body="{ item }">
        <MDC
          v-if="item.content"
          :value="item.content"
        />
        <UCollapsible
          v-if="item.details"
          class="mt-4"
          :unmount-on-hide="false"
        >
          <template #default="{ open }">
            <UButton
              class="group"
              color="neutral"
              variant="ghost"
              trailing-icon="i-lucide-chevron-down"
              :label="open ? t('HideDetails') : t('ShowDetails')"
              :ui="{
                trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
              }"
            />
          </template>

          <template #content>
            <MDC
              class="mt-4"
              :value="item.details"
            />
          </template>
        </UCollapsible>
      </template>
    </UAccordion>
  </MotionCard>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const { t } = useI18n()

defineProps({
  items: {
    type: Array as () => AccordionItem[]
  }
})
</script>
