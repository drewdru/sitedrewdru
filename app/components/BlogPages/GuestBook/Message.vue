<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div class="text-xs text-dimmed">
    {{t('VisitorId')}}: {{ content.visitorId }}
  </div>
  <div v-if="content.editable" class="absolute right-1 top-1">
    <UButton
      v-if="mode==='view'"
      class="rounded" variant="ghost"
      size="xs"
      icon="i-lucide-pencil"
      @click="() => { mode = 'edit' }"
    />
    <UButton
      v-else
      class="rounded" variant="ghost"
      size="xs"
      icon="i-lucide-eye"
      @click="() => { mode = 'view' }"
    />
  </div>
  <div class="flex flex-row justify-between">
    <div class="text-muted">
      {{ content.contact ? `${content.name} (${content.contact})` : `${content.name}` }}
    </div>
    <UTooltip :text="content.updatedAt">
      <div class="text-dimmed text-xs text-center cursor-help flex flex-col min-w-24">
        <span>
          {{ content.updatedAt === content.createdAt ? `${t('Edited')}:` : '' }}
        </span>
        <span>{{ useTimeAgoIntl(content.updatedAt, { locale }) }}</span>
      </div>
    </UTooltip>
  </div>
  <USeparator class="mb-4" />
  <div
    v-if="mode==='view'"
    class="break-words whitespace-pre-line"
  >
    {{ content.message }}
  </div>
  <UForm
    v-else
    ref="guestbookeditform"
    :schema="editSchema"
    :state="formState"
    :ui="{
      base: 'flex flex-col gap-4'
    }"
    @submit="() => {showRecaptcha = true}"
  >
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
    <UPopover
      :open="showRecaptcha"
      @update:open="(value) => value ? undefined : showRecaptcha = false"
    >
      <UButton
        type="submit"
        :loading="formLoading"
        :disabled="formLoading || !content"
        block
      >
        {{ t('UpdateMessage') }}
      </UButton>

      <template #content>
        <RecaptchaCheckbox
          v-model="formState.captcha"
          @expired="formState.captcha = undefined"
          @error="formState.captcha = undefined"
          @update:model-value="onSubmit"
        />
      </template>
    </UPopover>
  </UForm>

</template>

<script setup lang="ts">
import { useTimeAgoIntl } from '@vueuse/core'
import { fetchEditMessage } from '~~/layers/core/app/utils/api/guestbook/fetchEditMessage';
import { translateFormErrors } from '~~/layers/core/app/utils/form/tranlateErrors';
import { type EditSchema, editSchema, type GuestbookMessageResponseSchema } from '~~/shared/schemas/guestbook/messages';

const props = defineProps<{
  content: GuestbookMessageResponseSchema
}>()
const emit = defineEmits<{
  (e: "update", value: GuestbookMessageResponseSchema): void
}>()
const form = useTemplateRef('guestbookeditform')

const { t, locale } = useI18n()
const toast = useToast()

const mode = ref('view')
const showRecaptcha = ref(false)
const formLoading = ref(false)
const formState = reactive<EditSchema>({
  id: props.content.id,
  message: props.content.message,
  captcha: '',
})


const onSubmit = async () => {
  showRecaptcha.value = false
  formLoading.value = true
  try {
    await fetchEditMessage(formState)
    emit('update', {
      ...props.content,
      message: formState.message
    })
    mode.value = 'view'
  } catch (error: any) {
    console.log(error)
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
</script>