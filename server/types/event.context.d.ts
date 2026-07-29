declare module 'h3' {
  interface H3EventContext {
    realIp: string
    requestId: string
    requestTime: number
    authorization?: string
    visitor: {
      id: string
      data?: {
        lastRequestTime: number
        badTries: number,
        banned?: true,
        reason?: 'rate-limit'
      }
    }
  }
}

export {}
