import { fetchSendP2PSignal } from '~~/layers/dev/app/utils/api/games/rooms/sendSignal'
import type { WebRtcP2PSignal } from '~~/shared/types/sse/webrtc'
import type { WebRtcConnection, WebRtcManagerInitConnectionOptions } from '../../types/webRtcManager'
import { getConnectionKey } from './keys'
import { initChannels } from './channel'
import { createOffer } from './peer'
import { handleSessionSignal } from './signals/session'
import { handleIceSignal } from './signals/ice'
import { clearReconnectTimer, restartIce, scheduleReconnect } from './reconnect'

export class WebRtcManager {
  private readonly connections = new Map<string, WebRtcConnection>()

  async init(options: WebRtcManagerInitConnectionOptions): Promise<WebRtcConnection> {
    const connectionKey = getConnectionKey(options.gameId, options.roomId, options.peerRole)
    const existing = this.connections.get(connectionKey)
    if (existing) {
      this.destroyConnection(existing)
    }
    const connection = this.createConnection(options.gameId, options.roomId, options.peerRole, options.ownerRole)
    this.connections.set(connectionKey, connection)
    initChannels(connection, options)
    return connection
  }

  async connect(gameId: string, roomId: string, peerRole: string): Promise<void> {
    const connectionKey = getConnectionKey(gameId, roomId, peerRole)
    const connection = this.connections.get(connectionKey)
    if (!connection || connection.closed) {
      return
    }
    try {
      await createOffer(connection)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  getConnection(gameId: string, roomId: string, peerRole: string): WebRtcConnection | undefined {
    return this.connections.get(getConnectionKey(gameId, roomId, peerRole))
  }

  async handleSignal(data: WebRtcP2PSignal['data']): Promise<void> {
    const connection = this.getConnection(data.gameId, data.roomId, data.peerRole)
    if (!connection || connection.closed) {
      return
    }
    switch (data.signal.kind) {
      case 'session':
        await handleSessionSignal(connection, data.signal)
        break
      case 'ice':
        await handleIceSignal(connection, data.signal)
        break
      default:
        break
    }
  }

  disconnect(gameId: string, roomId: string, peerRole: string): void {
    const connection = this.getConnection(gameId, roomId, peerRole)
    if (connection) {
      this.destroyConnection(connection)
    }
  }

  disconnectRoom(gameId: string, roomId: string): void {
    for (const connection of this.connections.values()) {
      if (connection.gameId === gameId && connection.roomId === roomId) {
        this.destroyConnection(connection)
      }
    }
  }

  disconnectGame(gameId: string): void {
    for (const connection of this.connections.values()) {
      if (connection.gameId === gameId) {
        this.destroyConnection(connection)
      }
    }
  }

  disconnectAll(): void {
    for (const connection of this.connections.values()) {
      this.destroyConnection(connection)
    }
  }

  private destroyConnection(connection: WebRtcConnection): void {
    try {
      connection.closed = true
      connection.peerConnection.getTransceivers().forEach(t => t.stop())
      connection.peerConnection.close()
      clearReconnectTimer(connection)
    } catch (error) {
      console.error('Failed to destroy connection:', error)
    } finally {
      this.connections.delete(getConnectionKey(connection.gameId, connection.roomId, connection.peerRole))
    }
  }

  private createConnection(gameId: string, roomId: string, peerRole: string, ownerRole: string): WebRtcConnection {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }]
    })
    const connection: WebRtcConnection = {
      gameId,
      roomId,
      peerRole,
      ownerRole,
      peerConnection,
      state: 'new',
      reconnectAttempt: 0,
      closed: false,
      iceQueue: [],
      dataChannels: {}
    }
    this.setupPeerConnection(connection)
    return connection
  }

  private setupPeerConnection(connection: WebRtcConnection): void {
    connection.peerConnection.onconnectionstatechange = () => {
      this.handleConnectionState(connection).catch((error) => {
        console.error('WebRTC connection state handler failed:', error)
      })
    }
    connection.peerConnection.onicecandidate = (event) => {
      if (!event.candidate || connection.closed) {
        return
      }
      fetchSendP2PSignal(
        connection.gameId,
        connection.roomId,
        {
          toPeerRole: connection.peerRole,
          signal: {
            kind: 'ice',
            data: event.candidate.toJSON()
          }
        }
      ).catch((error) => {
        console.error('Failed to send ICE candidate:', error)
      })
    }
    connection.peerConnection.ondatachannel = (event) => {
      connection.onDataChannel?.(connection, event.channel)
    }
  }

  private async handleConnectionState(connection: WebRtcConnection): Promise<void> {
    const pcState = connection.peerConnection.connectionState
    connection.state = pcState
    switch (pcState) {
      case 'connected':
        connection.reconnectAttempt = 0
        clearReconnectTimer(connection)
        break
      case 'disconnected':
        scheduleReconnect(connection)
        break
      case 'failed':
        clearReconnectTimer(connection)
        await restartIce(connection)
        break
      case 'closed':
        this.destroyConnection(connection)
        break
      default:
        break
    }
  }
}
