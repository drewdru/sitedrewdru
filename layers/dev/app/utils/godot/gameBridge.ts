export const setupGameBridge = (
  setIsShowMainMenu: (value: boolean) => void
) => {
  window.__godotGameNetworkShowMainMenu = () => {
    setIsShowMainMenu(true)
  }
}
