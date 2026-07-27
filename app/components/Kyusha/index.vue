<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UPopover
    :content="{ side: 'top', align: 'start' }"
    :ui="{
      content: 'kyusha-message-popup'
    }"
    :open="isOpen"
  >
    <UButton
      variant="ghost"
      class="touch-none select-none font-mono cursor-grab text-mono text-base text-left m-0 p-0 hover:bg-transparent active:bg-transparent"
      @pointerdown="startPetting"
      @pointerup="stopPetting"
      @pointerleave="stopPetting"
      @pointercancel="stopPetting"
    >
      <ClientOnly>
        <pre>{{ currentPose }}</pre>
      </ClientOnly>
    </UButton>
    <template #content>
      <audio
        ref="audioPurring"
        preload="auto"
        class="hidden"
      />
      <div class="px-4 py-2 font-mono">
        {{ t(`PurringText${kyushaMessageNumber}`) }}
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { idlePoses, pettingPoses, rarePose } from './poses'

const { t } = useI18n()
const audioPurring = ref<HTMLAudioElement>()
const isOpen = ref(false)

const kyushaMessageNumber = ref(randomInt(1, 34))
const currentPose = ref(randomArrayItem(idlePoses))
let pettingInterval: ReturnType<typeof setInterval>
let closeTimer: ReturnType<typeof setTimeout>

const playRandomPurring = () => {
  if (!audioPurring.value) {
    return
  }
  audioPurring.value.src = `/audio/purring/${randomInt(1, 5)}.mp3`
  audioPurring.value.play()
}

const playRandomMeow = async () => {
  const audio = new Audio()
  audio.src = `/audio/meows/${randomInt(1, 14)}.mp3`
  audio.volume = 1
  audio.load()
  await audio.play()
}

const startPetting = () => {
  clearInterval(pettingInterval)
  clearTimeout(closeTimer)

  kyushaMessageNumber.value = randomInt(1, 34)
  isOpen.value = true

  pettingInterval = setInterval(() => {
    currentPose.value = randomArrayItem(pettingPoses)
    playRandomPurring()
  }, 1350)
}

const stopPetting = () => {
  clearTimeout(closeTimer)
  clearInterval(pettingInterval)

  closeTimer = setTimeout(() => {
    isOpen.value = false

    if (Math.random() < 0.2) {
      currentPose.value = randomArrayItem(rarePose)
      playRandomMeow()
    } else {
      currentPose.value = randomArrayItem(idlePoses)
    }
  }, 1000)
}
</script>

<style lang="scss">
.kyusha-message-popup {
  &::after {

    content: "";
    position: absolute;

    width: 0;
    height: 0;

    right: auto;
    top: auto;
    bottom: -1rem;
    left: 3rem;

    transform: translateX(-50%);

    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 16px solid var(--ui-bg-elevated);
    border-bottom: 0;

    filter: drop-shadow(0 1px 0 var(--ui-border));
  }
}
</style>
