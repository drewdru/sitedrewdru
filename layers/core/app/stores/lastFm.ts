import { defineStore } from 'pinia'

interface LastFmTrack {
  name: string | undefined
  description: string
  avatar: {
    src: string | undefined
    loading: 'lazy'
  }
  to: string
  target: string
  nowplaying: boolean
}

export const useLastFmStore = defineStore('lastFmStore', () => {
  const tracks = ref<LastFmTrack[]>([])
  function setTracks(data: LastFmTrack[]) {
    tracks.value = data
  }
  return {
    tracks,
    setTracks
  }
})
