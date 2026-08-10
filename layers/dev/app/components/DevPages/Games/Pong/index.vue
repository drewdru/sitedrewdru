<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <div style="width: 100%; height: 100%;">
    <canvas
      id="canvas"
      style="width: 100%; height: 100%;"
    />
    <UModal
      :open="true"
      :close="false"
      :ui="{
        header: 'justify-center'
      }"
    >
      <template #title>
        {{ t('PongPageTitle') }}
      </template>
      <template #body>
        <UBreadcrumb
          :items="breadcrumbs"
          class="mb-2"
        >
          <template #item="{ active, item }">
            <UButton
              variant="link"
              :icon="item.icon"
              :disabled="active"
            >
              {{ item.label }}
            </UButton>
          </template>
        </UBreadcrumb>
        <AnimatedLoader :loading="!isRealtimeConnected">
          <UTabs :items="tabs">
            <template #host>
              <UForm
                ref="createRoomForm"
                :state="state"
                @submit="createRoom"
              >
                <UFormField
                  label="Room Id:"
                  name="roomId"
                >
                  <div class="flex flex-row gap-4">
                    <UButton
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
                          text="Copy to clipboard"
                          :content="{ side: 'right' }"
                        >
                          <UButton
                            :color="copied ? 'success' : 'neutral'"
                            variant="link"
                            size="sm"
                            :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                            aria-label="Copy to clipboard"
                            @click="copy(state.roomId)"
                          />
                        </UTooltip>
                      </template>
                    </UInput>
                  </div>
                </UFormField>
              </UForm>
            </template>

            <template #client>
              <UForm
                ref="joinRoomForm"
                :schema="roomIdFormSchema"
                :state="state"
                @submit="joinRoom"
              >
                <UFormField
                  label="Room Id:"
                  name="roomId"
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
                      {{ t('JoinRoom') }}
                    </UButton>
                  </div>
                </UFormField>
              </UForm>
            </template>
          </UTabs>
        </AnimatedLoader>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'

import { useWebRtcStore } from '~~/layers/core/app/stores/webRtc'
import { useSseStore } from '~~/layers/core/app/stores/sse'
import { translateFormErrors, translateServerErrors } from '~~/layers/core/app/utils/form/tranlateErrors'
import { fetchCreateRoom } from '~~/layers/dev/app/utils/api/games/rooms/create'
import { fetchJoinRoom } from '~~/layers/dev/app/utils/api/games/rooms/join'
import { roomIdFormSchema } from '~~/shared/schemas/games/path'

const { copy, copied } = useClipboard()
const { t } = useI18n()
const toast = useToast()

const webRtcStore = useWebRtcStore()
const sseStore = useSseStore()
const { isRealtimeConnected } = storeToRefs(sseStore)
// onMounted(async () => initGame('pong'))
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
const breadcrumbs = ref<BreadcrumbItem[]>([
  {
    label: t('MainMenu'),
    icon: 'i-lucide-book-open'
  },
  {
    label: t('Online1v1'),
    icon: 'i-lucide-box'
  }
])
const createRoomForm = useTemplateRef('createRoomForm')
const joinRoomForm = useTemplateRef('joinRoomForm')
const state = reactive({
  roomId: ''
})

const loading = ref(false)
const gameId = 'pong'
const createRoom = async () => {
  try {
    loading.value = true
    const { roomId } = await fetchCreateRoom(gameId)
    const connection = await webRtcStore.initConnection({
      ownerRole: 'host',
      gameId,
      roomId,
      peerRole: 'client',
      dataChannels: {
        game: {
          ordered: false,
          maxRetransmits: 0
        }
      }
    })
    if (connection.dataChannels.game) {
      connection.dataChannels.game.onopen = () => {
        console.log('client game ready')
      }
      connection.dataChannels.game.onclose = () => {
        console.error('client game channel closed')
        connection.dataChannels.game = undefined
      }
      connection.dataChannels.game.onerror = (error) => {
        console.error('client game channel error:', error)
      }
      connection.dataChannels.game.onmessage = (event) => {
        const message = safeJsonParse(event.data)
        if (message) {
          console.log('client game message', message)
        }
      }
    }
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

const joinRoom = async () => {
  try {
    loading.value = true
    await webRtcStore.initConnection({
      ownerRole: 'client',
      gameId,
      roomId: state.roomId,
      peerRole: 'host',
      onDataChannel: (connection, channel) => {
        if (channel.label !== 'game') {
          channel.close()
          return
        }
        connection.dataChannels.game = channel
        channel.onopen = () => {
          console.log(`host ${channel.label} ready`)
        }
        channel.onclose = () => {
          console.error(`host ${channel.label} channel closed`)
          connection.dataChannels.game = undefined
        }
        channel.onerror = (error) => {
          console.error(`host ${channel.label} channel error:`, error)
        }
        channel.onmessage = (event) => {
          const message = safeJsonParse(event.data)
          if (message) {
            console.log(`client ${channel.label} message`, message)
          }
        }
      }
    })
    await fetchJoinRoom('pong', state.roomId)
  } catch (error: any) {
    toast.add({
      ...translateServerErrors(t, error?.statusCode, error?.data?.errorCode),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    joinRoomForm.value?.setErrors(translateFormErrors(t, error?.data?.errors))
  } finally {
    loading.value = false
  }
}
</script>
