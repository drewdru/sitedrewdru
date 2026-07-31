<template>
  <div ref="container" class="p-2" />
</template>

<script setup lang="ts">
import { useAppStore } from '~~/layers/core/app/stores/app'

const recaptchaSiteKey = useRuntimeConfig().public.google.recaptcha.v2SiteKey || ""
const container = ref<HTMLElement | null>(null)

const { t } = useI18n()
const toast = useToast()
const appStore = useAppStore()
const { isHydrated } = storeToRefs(appStore)
const isCaptchaLoaded = ref(false)
const isWaitForScript = ref(false)
const MAX_WAIT = 5000
const POLL_INTERVAL = 50
const startTime = Date.now()

defineProps<{
  modelValue: string | null | undefined
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void
  (e: "expired"): void
  (e: "error"): void
}>()

const loadRecaptcha = async () => {
  if (!recaptchaSiteKey) {
    console.error("reCAPTCHA v2 siteKey is missing")
    return
  }
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit"
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = err => reject(err)
    document.head.appendChild(script)
  })
  isWaitForScript.value = true

  const waitForRecaptcha = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).grecaptcha?.render) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).grecaptcha.render(container.value!, {
        "sitekey": recaptchaSiteKey,
        "theme": "dark",
        "callback": (token: string) => {
          emit("update:modelValue", token)
          isCaptchaLoaded.value = true
          isWaitForScript.value = false
        },
        "expired-callback": () => {
          emit("update:modelValue", null)
          emit("expired")
        },
        "error-callback": () => {
          emit("update:modelValue", null)
          emit("error")
          toast.add({
            title: `${t("ErrorLoadingData")}: Recaptcha`,
            description: t("SomethingWentWrongReloadPage")
          })
        },
      })
    } else if (Date.now() - startTime > MAX_WAIT) {
      isWaitForScript.value = false
      toast.add({
        title: `${t("ErrorLoadingData")}: Recaptcha`,
        description: t("SomethingWentWrongReloadPage")
      })
    } else {
      setTimeout(waitForRecaptcha, POLL_INTERVAL)
    }
  }
  waitForRecaptcha()
}

watch(
  [isHydrated, container],
  async ([hydrated, el]) => {
    if (!hydrated || !el) {
      return
    }
    if (hydrated && !isCaptchaLoaded.value && !isWaitForScript.value) {
      await loadRecaptcha()
    }
  },
  { immediate: true },
)
</script>
