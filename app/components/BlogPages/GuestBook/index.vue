<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div class="guestbook text-left">
    <MotionCard
      class="p-0 lg:p-0"
      card-body-class="overflow-auto"
    >
      <UForm
        ref="guestbookform"
        :schema="bodySchema"
        :state="state"
        @submit="onSubmit"
      >
        <div class="flex flex-row gap-4">
          <div class="flex flex-col gap-4 min-w-[12rem] w-[16rem] h-[11.75rem] justify-between">
            <UFormField
              name="name"
              :label="t('FormName')"
            >
              <UInput v-model="state.name" />
            </UFormField>
            <UFormField
              name="contact"
              :label="t('FormHandleOptional')"
            >
              <UInput
                v-model="state.contact"
                :placeholder="t('FormHandleOptionalPlaceholder')"
              />
            </UFormField>
          </div>
          <div class="w-full flex flex-col gap-4 h-[11.75rem] justify-between">
            <UFormField
              name="message"
              :label="t('FormMessage')"
            >
              <UTextarea
                v-model="state.message"
                class="w-full"
                :ui="{
                  base: 'w-full h-[88px]'
                }"
                height="88px"
                @keydown.ctrl.enter="form?.submit()"
                @keydown.meta.enter="form?.submit()"
              />
            </UFormField>
            <UButton
              type="submit"
              :loading="sending"
              :disabled="sending || !data"
              block
            >
              {{ t('PostMessage') }}
            </UButton>
          </div>
        </div>
      </UForm>
    </MotionCard>
    <UContainer class="flex flex-col gap-4 lg:px-0 py-4">
      <MotionCard
        v-for="message in (data?.data ?? [])"
        :key="message.id"
      >
        <div class="flex flex-row justify-between">
          <div class="text-muted">
            {{ message.contact ? `${message.name} (${message.contact})` : `${message.name}` }}
          </div>
          <div class="text-dimmed text-xs text-center">
            {{ useTimeAgo(message.createdAt) }}
          </div>
        </div>
        <USeparator class="mb-4" />
        <div class="break-words whitespace-pre-line">
          {{ message.message }}
        </div>
      </MotionCard>
      <AnimatedLoader :loading="sending || pending">
        <UPagination
          v-model:page="page"
          :total="data?.pagination.total"
          :sibling-count="1"
          show-edges
          :ui="{
            list: 'justify-center'
          }"
          @update:page="(value) => page = value"
        />
      </AnimatedLoader>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { type BodySchema, bodySchema } from '~~/shared/schemas/guestbook/messages'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const scrollToTop = inject<() => void>('scrollToTop')
const form = useTemplateRef('guestbookform')

const page = computed({
  get: () => {
    scrollToTop?.()
    return Number(route.query.page || 1)
  },
  set: (value) => {
    router.replace({
      query: {
        ...route.query,
        page: value === 1 ? undefined : String(value)
      }
    })
  }
})

const sending = ref(false)
const state = reactive<BodySchema>({
  name: '',
  contact: '',
  message: ''
})
const onSubmit = async () => {
  sending.value = true

  try {
    const newMessage = await $fetch('/api/v1/guestbook/messages', {
      method: 'POST',
      body: state,
      credentials: 'include'
    })

    state.name = ''
    state.contact = ''
    state.message = ''

    await refresh()
    const hasMessage = data.value?.data.find(item => item.id === newMessage.id)
    if (!hasMessage) {
      data.value = {
        ...data.value!,
        data: [
          newMessage,
          ...data.value!.data
        ]
      }
    }
  } finally {
    sending.value = false
  }
}

const { data, pending, refresh } = await useFetch(`/api/v1/guestbook/messages`, {
  query: computed(() => ({
    page: page.value
  })),
  credentials: 'include'
})
</script>
