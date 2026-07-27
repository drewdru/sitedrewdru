declare module 'h3' {
  interface H3EventContext {
    realIp: string
    requestId: string
    requestTime: number
    authorization?: string
    sessionId: string
    sessionData?: {
      lastRequestTime: number
      badTries: number
    }
  }
}

export {}
