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
        :state="formState"
        @submit="onSubmit"
      >
        <div class="flex flex-row gap-4">
          <div class="flex flex-col gap-4 min-w-[12rem] w-[16rem] h-[11.75rem] justify-between">
            <UFormField
              name="name"
              :label="t('FormName')"
            >
              <UInput v-model="formState.name" />
            </UFormField>
            <UFormField
              name="contact"
              :label="t('FormHandleOptional')"
            >
              <UInput
                v-model="formState.contact"
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
                v-model="formState.message"
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
              :loading="formLoading"
              :disabled="formLoading || !data"
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
      <AnimatedLoader :loading="formLoading || loading">
        <UPagination
          v-show="data !== undefined"
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
import { fetchMessages } from '~~/layers/core/app/utils/api/guestbook/fetchMessages'
import { fetchPostMessage } from '~~/layers/core/app/utils/api/guestbook/postMessage'
import { translateFormErrors } from '~~/layers/core/app/utils/form/tranlateErrors'
import { type BodySchema, bodySchema, type ResponseGetSchema } from '~~/shared/schemas/guestbook/messages'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const scrollToTop = inject<() => void>('scrollToTop')
const form = useTemplateRef('guestbookform')

const data = ref<ResponseGetSchema | undefined>(undefined)
const loading = ref(true)
const formLoading = ref(false)
const formState = reactive<BodySchema>({
  name: '',
  contact: '',
  message: ''
})
const clearFormState = () => {
  formState.name = ''
  formState.contact = ''
  formState.message = ''
}

const page = computed({
  get: () => Number(route.query.page || 1),
  set: (value) => {
    router.replace({
      query: {
        ...route.query,
        page: value === 1 ? undefined : String(value)
      }
    })
  }
})

const onSubmit = async () => {
  formLoading.value = true
  try {
    const newMessage = await fetchPostMessage(formState)
    clearFormState()
    await refetch()
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
  } catch (error: any) {
    toast.add({
      title: t('Error'),
      description: t(`validation.${error?.data?.errorCode ?? 'SomethingWentWrong'}`),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    form.value?.setErrors(translateFormErrors(t, error?.data?.errors))
  } finally {
    formLoading.value = false
  }
}

const refetch = async () => {
  loading.value = true
  try {
    data.value = await fetchMessages(page.value)
  } catch (error: any) {
    toast.add({
      title: t('ErrorLoadingData'),
      description: t(`validation.${error?.data?.errorCode ?? 'SomethingWentWrong'}`),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => refetch())
watch(page, () => {
  scrollToTop?.()
  refetch()
})
</script>
