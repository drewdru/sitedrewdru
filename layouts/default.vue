<template>
  <div
    class="theme layout"
    :style="{
      '--body': theme.body,
      '--body-text': theme.bodyText,
      '--primary': theme.primary,
      '--secondary': theme.secondary,
      '--active': theme.active,
      '--active-text': theme.activeText,
      '--accent': theme.accent,
      '--accent-text': theme.accentText,
      '--error': theme.error,
      '--info': theme.info,
      '--info-text': theme.infoText,
      '--success': theme.success,
      '--warning': theme.warning,
      '--shadow': theme.shadow,
      '--control': theme.control,
      '--control-text': theme.controlText,
      '--button': theme.button,
      '--button-text': theme.buttonText,
    }"
    :class="{ 'user-is-tabbing': isTabbing }"
  >
    <NavBar />
    <!-- <ClientOnly></ClientOnly> -->

    <main id="main" class="page">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
useMeta({
  bodyAttrs: {
    class: "body",
  },
});

let isTabbing = false;
const theme = {
  themeName: "bizarre",
  body: "#eee2dc",
  bodyText: "#123c69",
  primary: "#AC3B61",
  secondary: "#eee2dc",
  active: "#42b983",
  activeText: "#FFFFFF",
  accent: "#EDC7b7",
  accentText: "#123c69",
  error: "#FF5252",
  info: "#faebd7",
  infoText: "#123c69",
  success: "#4CAF50",
  warning: "#FB8C00",
  shadow: "#B05F7A80",
  control: "#FFF5F5",
  controlText: "#123c69",
  button: "#2f885d",
  buttonText: "#FFFFFF",
};

onMounted(() => {
  document.body.style.backgroundColor = theme.body;
  window.addEventListener("keydown", handleFirstTab);
});

const handleFirstTab = (event: any) => { // eslint-disable-line
  if (event.keyCode === 9) {
    isTabbing = true;
    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  isTabbing = false;
  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};
</script>

<style lang="less">
/*
@import "./variables.less";
@import "./styles/layout.less";
@import "./styles/form.less";
@import "./styles/controls.less";
@import "./styles/icons.less";
@import "./styles/table.less";
*/

* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  @media screen and (max-width: 200px) {
    word-wrap: anywhere;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--body);
  color: var(--body-text);
  min-height: 100%;
  *:focus {
    outline: 0;
  }
  *::-moz-focus-inner {
    border: 0;
  }
  &.user-is-tabbing *:focus {
    outline: 2px dotted var(--body-text) !important;
  }
}
</style>
