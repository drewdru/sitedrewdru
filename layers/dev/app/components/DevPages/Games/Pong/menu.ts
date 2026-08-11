import GameMenuSelectButtons from '~~/layers/dev/app/components/GameMenu/SelectButtons/index.vue'
import GameMenuRoom1v1 from '~~/layers/dev/app/components/GameMenu/Room1v1/index.vue'
import type { GameMenuPage, Room1v1Props } from '~~/layers/dev/app/types/gameMenu'

export const getMenu = (params: {
  t: (text: string) => string
  onPlayLocal: () => void
  initGameMenuRoom1v1Props?: Room1v1Props['initProps']
}): Record<string, GameMenuPage> => ({
  'main': {
    component: GameMenuSelectButtons,
    breadcrumb: {
      name: 'main',
      label: params.t('MainMenu'),
      icon: 'i-lucide-book-open'
    },
    props: {
      menu: [
        { path: 'main.play', label: params.t('Play') }
        // { path: 'main.settings', label: t('Settings') },
        // { path: 'main.credits', label: t('Credits') }
      ]
    }
  },

  'main.play': {
    component: GameMenuSelectButtons,
    breadcrumb: {
      name: 'main.play',
      label: params.t('Play'),
      icon: 'i-lucide-gamepad-2'
    },
    props: {
      menu: [
        { path: 'main.play.online', label: params.t('Online') },
        { path: 'main.play.local', label: params.t('Local'), buttonProps: { onClick: params.onPlayLocal } }
      ]
    }
  },

  'main.play.online': {
    component: GameMenuRoom1v1,
    breadcrumb: {
      name: 'main.play.online',
      label: params.t('Online'),
      icon: 'i-lucide-globe'
    },
    props: {
      initProps: params.initGameMenuRoom1v1Props ?? {}
    }
  }
})
