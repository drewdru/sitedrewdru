import { useQuery } from 'h3'
import type { IncomingMessage, ServerResponse } from 'http'

export default async (req: IncomingMessage, res: ServerResponse) => {
  return {
    query: useQuery(req)
  }
}
