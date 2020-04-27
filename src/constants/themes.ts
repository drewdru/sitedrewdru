import vue from '@/themes/vue';
import bizarre from '@/themes/bizarre';
import dracula from '@/themes/dracula';

export let themes: any = {
  bizarre,
  dracula,
  vue,
};


const customTheme = JSON.parse(localStorage.getItem('customTheme') || '{}');
if (Object.keys(customTheme).length > 0) {
  themes = {customTheme, ...themes};
}

let theme = themes.bizarre;
const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme in themes) {
  theme = themes[savedTheme];
}

export const defaultTheme: any = theme;
