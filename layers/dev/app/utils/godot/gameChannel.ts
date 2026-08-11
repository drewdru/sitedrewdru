import type { WebRtcConnection } from '~~/layers/core/app/types/webRtcManager'

export const setupGameChannel = (params: {
  connection: WebRtcConnection
  channel?: RTCDataChannel
  setIsShowMainMenu: (value: boolean) => void
}) => {
  if (!params.connection.dataChannels.game && !params.channel) {
    return
  }
  if (params.channel && (params.channel.label !== 'game' || params.connection.dataChannels.game)) {
    params.channel.close()
    return
  }
  if (params.channel) {
    params.connection.dataChannels.game = params.channel
  }
  if (!params.connection.dataChannels.game) {
    return
  }

  window.__godotGameNetworkSend = (message: string) => {
    if (params.connection.dataChannels.game?.readyState !== 'open') {
      return
    }
    params.connection.dataChannels.game.send(message)
  }

  params.connection.dataChannels.game.onopen = () => {
    window.__godotGameNetworkConnected?.()
    window.__godotWebMenuSetPlayerRole?.(params.connection.ownerRole)
    window.__godotWebMenuSetGameMode?.('online')
    params.setIsShowMainMenu(false)
  }

  params.connection.dataChannels.game.onclose = () => {
    params.connection.dataChannels.game = undefined
    window.__godotWebMenuSetGameMode?.('pause')
    window.__godotGameNetworkDisconnected?.()
  }

  params.connection.dataChannels.game.onerror = (error) => {
    console.error('Godot game channel error:', error)
  }

  params.connection.dataChannels.game.onmessage = (event) => {
    if (typeof event.data !== 'string') {
      return
    }
    window.__godotGameNetworkOnMessage?.(event.data)
  }
}
