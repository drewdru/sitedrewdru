export interface Theme {
  themeName: string;
  body: string;
  bodyText: string;
  primary: string;
  secondary: string;
  active: string;
  activeText: string;
  accent: string;
  accentText: string;
  error: string;
  info: string;
  infoText: string;
  success: string;
  warning: string;
  shadow: string;
  control: string;
  controlText: string;
  button: string;
  buttonText: string;
}

export interface Themes {
  bizarre: Theme;
  dracula: Theme;
  vue: Theme;
  customTheme?: Theme;
}
