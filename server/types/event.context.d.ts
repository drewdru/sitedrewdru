declare module 'h3' {
  interface H3EventContext {
    realIp: string
    requestId: string
    requestTime: number
    authorization?: string
    visitor: {
      id: string
      publicId: string
      data: {
        lastRequestTime: number
        badTries: number
        badRecaptchaTries: number
        banned?: true
        reason?: 'rate-limit'
        name?: string
        contact?: string
      }
    }
  }
}

export {}
