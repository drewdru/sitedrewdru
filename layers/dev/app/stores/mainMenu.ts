import { defineStore } from 'pinia'
import type { GameMenuPage } from '../types/gameMenu'

export const useGameMainMenuStore = defineStore('gameMainMenuStore', () => {
  const currentPath = ref('')
  const navigate = (path: string | undefined) => {
    if (!path || !menu.value?.[path]) {
      return
    }
    currentPath.value = path
  }

  const menu = ref<Record<string, GameMenuPage> | undefined>(undefined)
  function setupMenu(params: {
    menu: Record<string, GameMenuPage>
    initPath: string
  }) {
    menu.value = params.menu
    currentPath.value = params.initPath
  }

  const isShowMainMenu = ref<boolean>(false)
  function setIsShowMainMenu(value: boolean) {
    isShowMainMenu.value = value
  }

  return {
    menu,
    setupMenu,
    isShowMainMenu,
    setIsShowMainMenu,
    currentPath,
    navigate
  }
})
