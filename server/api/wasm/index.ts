
import type { IncomingMessage, ServerResponse } from 'http'
// TODO: https://github.com/nuxt/framework/tree/main/examples/with-wasm
// wasm loaders broken for nuxt3-3.0.0-27252999.d2cc9e4
// import sample from './sample.wasm'

export default async (req: IncomingMessage, res: ServerResponse) => {
  // const { instance } = await sample({})
  return {
    result: "instance.exports.main()"
  }
}
