import type { WebRtcConnection, WebRtcManagerInitConnectionOptions } from '../../types/webRtcManager'

export const initChannels = (connection: WebRtcConnection, options: WebRtcManagerInitConnectionOptions) => {
  if (options.onDataChannel) {
    connection.onDataChannel = options.onDataChannel
  }
  if (options.dataChannels?.game) {
    const channel = connection.peerConnection.createDataChannel('game', options.dataChannels.game)
    connection.dataChannels.game = channel
    channel.onmessage = event => console.log(channel.label, event)
    channel.onopen = event => console.log(channel.label, event)
    channel.onerror = error => console.error(channel.label, error)
  }
}
