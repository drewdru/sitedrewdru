import { useState } from "#app";
import { defaultTheme, themes } from "@/constants/themes";

export const useTheme = () => {
  // const nuxtApp = useNuxtApp();
  // console.log("ssrContext:", nuxtApp.ssrContext);

  const theme = useState("theme", () => defaultTheme);
  const setTheme = (newThemeName: string) => {
    theme.value = themes[newThemeName];
    document.body.style.backgroundColor = theme.value.body;
    // TODO: save to local storage
    // localStorage.setItem("theme", newThemeName);
  };
  return { theme, setTheme };
};
