import red from '@/themes/red';
import blue from '@/themes/blue';
import vue from '@/themes/vue';
import bizarre from '@/themes/bizarre';
import dracula from '@/themes/dracula';


export const THEMES: any = {
  vue: 'vue',
  dracula: 'dracula',
  red: 'red',
  blue: 'blue',
  bizarre: 'bizarre',
};

export const themes: any = {
  vue,
  dracula,
  red,
  blue,
  bizarre,
};

let theme = themes[THEMES.vue];
const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme in themes) {
  theme = themes[savedTheme];
}

export const defaultTheme: any = theme;
