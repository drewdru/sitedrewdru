import type { EventStream } from 'h3'

export const clients = new Map<string, EventStream>()
