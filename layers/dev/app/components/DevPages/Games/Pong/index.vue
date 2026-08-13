<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <AnimatedLoader :loading="isGameLoading">
    <canvas
      id="canvas"
      style="width: 100%; height: 100%;"
    />
    <GameMenu :game-id="gameId">
      <template #title>
        {{ t('PongPageTitle') }}
      </template>
    </GameMenu>
  </AnimatedLoader>
</template>

<script setup lang="ts">
import { useGameMainMenuStore } from '~~/layers/dev/app/stores/mainMenu'
import { initGamePong } from '~~/layers/dev/app/utils/godot/games/pong'
import { getMenu } from './menu'
import { setupGameBridge } from '~~/layers/dev/app/utils/godot/gameBridge'

const gameId = 'pong'
const { t } = useI18n()
const toast = useToast()

const route = useRoute()
const initPath = route.query?.menuPath?.toString()

const gameMainMenuStore = useGameMainMenuStore()

const isGameLoading = ref(true)

onMounted(async () => {
  initGamePong({
    t,
    isGameLoading,
    showToast: toast.add,
    setIsShowMainMenu: gameMainMenuStore.setIsShowMainMenu
  })
  setupGameBridge({
    t,
    showToast: toast.add,
    setIsShowMainMenu: gameMainMenuStore.setIsShowMainMenu
  })
  gameMainMenuStore.setupMenu({
    initPath: initPath ?? 'main',
    menu: getMenu({
      t,
      onPlayLocal: () => {
        gameMainMenuStore.navigate('pause')
        window.__godotWebGameBridgeStartLocal?.()
      },
      initGameMenuRoom1v1Props: {
        roomId: route.query?.roomId?.toString() ?? '',
        tab: route.query?.tab?.toString() ?? 'host'
      }
    })
  })
})
</script>
