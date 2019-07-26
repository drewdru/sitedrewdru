import red from '@/themes/red';
import blue from '@/themes/blue';
import vue from '@/themes/vue';

export const THEMES: any = {
  red: 'red',
  blue: 'blue',
  vue: 'vue',
};

export const themes: any = {
  red,
  blue,
  vue,
};

export const defaultTheme: any = themes[THEMES.blue];
