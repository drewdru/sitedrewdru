import red from '@/themes/red';
import blue from '@/themes/blue';
import vue from '@/themes/vue';
import bizarre from '@/themes/bizarre';
import dracula from '@/themes/dracula';


export const THEMES: any = {
  bizarre: 'bizarre',
  dracula: 'dracula',
  vue: 'vue',
  blue: 'blue',
  red: 'red',
};

export const themes: any = {
  bizarre,
  dracula,
  vue,
  blue,
  red,
};

let theme = themes[THEMES.bizarre];
const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme in themes) {
  theme = themes[savedTheme];
}

export const defaultTheme: any = theme;
