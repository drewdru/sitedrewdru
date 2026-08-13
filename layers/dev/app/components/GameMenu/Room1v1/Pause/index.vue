<i18n locale="en" lang="yaml" src="../locales/en.yml" />

<i18n locale="ru" lang="yaml" src="../locales/ru.yml" />

<template>
  <div class="flex flex-col gap-4">
    <UButton @click="onResumeGame">
      {{ t('Resume') }}
    </UButton>
    <UButton @click="onRestartGame">
      {{ t('Restart') }}
    </UButton>
    <UButton @click="onDisconnect">
      {{ t('Disconnect') }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { useWebRtcStore } from '~~/layers/core/app/stores/webRtc';
import { useGameMainMenuStore } from '~~/layers/dev/app/stores/mainMenu';

const { t } = useI18n()
const webRtcStore = useWebRtcStore()
const gameMainMenuStore = useGameMainMenuStore()

const props = defineProps<{
  gameId: string
  exitPath: string
}>()

const onRestartGame = () => window.__godotWebGameBridgeRestart?.()
const onResumeGame = () => window.__godotWebGameBridgeResume?.()
const onDisconnect = () => {
  webRtcStore.disconnectGame(props.gameId)
  gameMainMenuStore.navigate(props.exitPath)
}
</script>
