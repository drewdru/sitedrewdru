<template>
  <UTabs
    v-model="activeTab"
    :items="tabs"
  >
    <template #host>
      <GameMenuRoom1v1HostForm
        :game-id="gameId"
        :menu-path="menuPath"
      />
    </template>

    <template #client>
      <GameMenuRoom1v1JoinForm
        :game-id="gameId"
        :init-room-id="initProps?.roomId"
      />
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import type { Room1v1Props } from '../../../types/gameMenu'

const props = defineProps<{
  gameId: string
  menuPath: string
  initProps?: Room1v1Props['initProps']
}>()

const { t } = useI18n()
const tabs = [
  {
    label: t('HostRoom'),
    icon: 'i-lucide-user',
    slot: 'host'
  },
  {
    label: t('JoinRoom'),
    icon: 'i-lucide-lock',
    slot: 'client'
  }
]
const initTab = props.initProps?.tab === '1' ? '1' : '0'
const activeTab = ref(initTab)
</script>
