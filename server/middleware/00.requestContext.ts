import { randomUUIDv7 } from 'node:crypto'

export default defineEventHandler(async (event) => {
  event.context.requestId = randomUUIDv7()
  event.context.requestTime = Date.now()
  event.context.realIp = getHeader(event, 'cf-connecting-ip')
    || event.context.clientAddress
    || getRequestIP(event, { xForwardedFor: true })
    || event.node.req?.socket?.remoteAddress
    || '127.0.0.1'
  event.context.authorization = getHeader(event, 'authorization')
})
