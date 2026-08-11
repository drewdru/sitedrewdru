<i18n locale="en" lang="yaml" src="../locales/en.yml" />

<i18n locale="ru" lang="yaml" src="../locales/ru.yml" />

<template>
  <UForm
    ref="createRoomForm"
    :state="state"
    @submit="createRoom"
  >
    <UFormField
      :label="`${t('RoomId')}:`"
      name="roomId"
      :hint="!!state.roomId ? t('ShareRoomIdWithFriend') : ''"
    >
      <div class="flex flex-row gap-4">
        <UButton
          v-if="!state.roomId"
          type="submit"
          :loading="loading"
        >
          {{ t('Create') }}
        </UButton>
        <UInput
          v-model="state.roomId"
          class="w-full"
          :readonly="true"
          :ui="{ trailing: 'pr-0.5' }"
        >
          <template
            v-if="state.roomId?.length"
            #trailing
          >
            <UTooltip
              :text="t('CopyToClipboard')"
              :content="{ side: 'right' }"
            >
              <UButton
                :color="copied ? 'success' : 'neutral'"
                variant="link"
                size="sm"
                :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                :aria-label="t('CopyToClipboard')"
                @click="copy(`${config.public.siteUrl}${route.path}?roomId=${state.roomId}&tab=1&menuPath=${menuPath}`)"
              />
            </UTooltip>
          </template>
        </UInput>
      </div>
    </UFormField>
  </UForm>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

import { fetchCreateRoom } from '~~/layers/dev/app/utils/api/games/rooms/create'
import { useWebRtcStore } from '~~/layers/core/app/stores/webRtc'
import { translateFormErrors, translateServerErrors } from '~~/layers/core/app/utils/form/tranlateErrors'
import { setupGameChannel } from '~~/layers/dev/app/utils/godot/gameChannel'
import { useGameMainMenuStore } from '../../../../stores/mainMenu'

const props = defineProps<{
  gameId: string
  menuPath: string
}>()

const config = useRuntimeConfig()
const createRoomForm = useTemplateRef('createRoomForm')
const webRtcStore = useWebRtcStore()
const route = useRoute()
const { copy, copied } = useClipboard()
const { t } = useI18n()
const toast = useToast()
const gameMainMenuStore = useGameMainMenuStore()

const state = reactive({
  roomId: ''
})
const loading = ref(false)

const createRoom = async () => {
  try {
    loading.value = true
    const { roomId } = await fetchCreateRoom(props.gameId)
    const connection = await webRtcStore.initConnection({
      ownerRole: 'host',
      gameId: props.gameId,
      roomId,
      peerRole: 'client',
      dataChannels: {
        game: {
          ordered: false,
          maxRetransmits: 0
        }
      }
    })
    setupGameChannel({
      connection,
      setIsShowMainMenu: gameMainMenuStore.setIsShowMainMenu
    })
    state.roomId = roomId
  } catch (error: any) {
    toast.add({
      ...translateServerErrors(t, error?.statusCode, error?.data?.errorCode),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    createRoomForm.value?.setErrors(translateFormErrors(t, error?.data?.errors))
  } finally {
    loading.value = false
  }
}
</script>
