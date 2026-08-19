<i18n locale="en" lang="yaml" src="../locales/en.yml" />

<i18n locale="ru" lang="yaml" src="../locales/ru.yml" />

<template>
  <UForm
    ref="joinRoomForm"
    :schema="roomIdFormSchema"
    :state="state"
    @submit="joinRoom"
  >
    <UFormField
      :label="`${t('RoomId')}:`"
      name="roomId"
      :help="helpJoin"
    >
      <div class="flex flex-row gap-4">
        <UInput
          v-model="state.roomId"
          class="w-full"
        />
        <UButton
          type="submit"
          :loading="loading"
        >
          {{ t('Join') }}
        </UButton>
      </div>
    </UFormField>
  </UForm>
</template>

<script setup lang="ts">
import { roomIdFormSchema } from '~~/shared/schemas/games/path'
import { fetchJoinRoom } from '~~/layers/dev/app/utils/api/games/rooms/join'

import { useWebRtcStore } from '~~/layers/core/app/stores/webRtc'
import { translateFormErrors, translateServerErrors } from '~~/layers/core/app/utils/form/tranlateErrors'
import { setupGameChannel } from '~~/layers/dev/app/utils/godot/gameChannel'
import { useGameMainMenuStore } from '../../../../stores/mainMenu'
import type { WebRtcConnection } from '~~/layers/core/app/types/webRtcManager'

const props = defineProps<{
  gameId: string
  initRoomId?: string
  helpJoin?: string
}>()

const joinRoomForm = useTemplateRef('joinRoomForm')
const webRtcStore = useWebRtcStore()
const { t } = useI18n()
const toast = useToast()
const gameMainMenuStore = useGameMainMenuStore()
const menuPath = `${gameMainMenuStore.currentPath}`

const state = reactive({
  roomId: props.initRoomId ?? ''
})
const loading = ref(false)

const joinRoom = async () => {
  try {
    loading.value = true
    await webRtcStore.initConnection({
      ownerRole: 'client',
      gameId: props.gameId,
      roomId: state.roomId,
      peerRole: 'host',
      onDataChannel: (connection: WebRtcConnection, channel: RTCDataChannel) => {
        setupGameChannel({
          connection,
          channel,
          setIsShowMainMenu: gameMainMenuStore.setIsShowMainMenu,
          openPauseMenu: () => gameMainMenuStore.navigate('pause'),
          t,
          showToast: toast.add,
          onDisconnected: () => {
            gameMainMenuStore.navigate(menuPath)
            loading.value = false
          }
        })
        loading.value = false
      }
    })
    await fetchJoinRoom(props.gameId, state.roomId)
  } catch (error: any) {
    toast.add({
      ...translateServerErrors(t, error?.statusCode, error?.data?.errorCode),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    joinRoomForm.value?.setErrors(translateFormErrors(t, error?.data?.errors))
    loading.value = false
  }
}
</script>
