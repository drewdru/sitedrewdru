import { defineStore } from 'pinia'
import type { WebRtcP2PPeerJoined, WebRtcP2PSignal } from '~~/shared/types/sse/webrtc'
import { WebRtcManager } from '../utils/webRtc'
import type { WebRtcManagerInitConnectionOptions } from '../types/webRtcManager'

export const useWebRtcStore = defineStore('webRtc', () => {
  const manager = new WebRtcManager()

  async function initConnection(options: WebRtcManagerInitConnectionOptions) {
    return manager.init(options)
  }

  async function connect(data: WebRtcP2PPeerJoined['data']) {
    return await manager.connect(data.gameId, data.roomId, data.peerRole)
  }

  function getConnection(gameId: string, roomId: string, peerRole: string) {
    return manager.getConnection(gameId, roomId, peerRole)
  }

  function handleSignal(data: WebRtcP2PSignal['data']) {
    return manager.handleSignal(data)
  }

  function disconnect(gameId: string, roomId: string, peerRole: string) {
    return manager.disconnect(gameId, roomId, peerRole)
  }

  return {
    initConnection,
    connect,
    getConnection,
    handleSignal,
    disconnect
  }
})
