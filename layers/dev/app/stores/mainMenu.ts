import { defineStore } from 'pinia'

export const useGameMainMenuStore = defineStore('gameMainMenuStore', () => {
  const isShowMainMenu = ref<boolean>(false)
  function setIsShowMainMenu(value: boolean) {
    isShowMainMenu.value = value
  }
  return {
    isShowMainMenu,
    setIsShowMainMenu
  }
})
