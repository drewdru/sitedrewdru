import { Theme, Themes } from "@/constants/themes/index.d";
import { vue } from "@/constants/themes/vue";
import { bizarre } from "@/constants/themes/bizarre";
import { dracula } from "@/constants/themes/dracula";

let themeList: Themes = {
  bizarre,
  dracula,
  vue,
};

let theme = themeList.bizarre;

if (process.client) {
  const customTheme: Theme = JSON.parse(
    localStorage.getItem("customTheme") || "{}"
  );
  if (Object.keys(customTheme).length > 0) {
    themeList = { ...themeList, customTheme };
  }
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && savedTheme in themeList) {
    theme = themeList[savedTheme];
  }
}

export const defaultTheme = theme;
export const themes = themeList;
