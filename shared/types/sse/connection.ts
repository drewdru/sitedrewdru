export interface SseConnectionReplaced {
  type: 'sse.replaced'
  data?: undefined
}

export interface SseConnectionPing {
  type: 'sse.ping'
  data?: undefined
}
