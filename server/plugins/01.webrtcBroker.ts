import { initWebRtcBroker } from '../utils/webrtc/broker'

export default defineNitroPlugin(async () => {
  await initWebRtcBroker()
})
