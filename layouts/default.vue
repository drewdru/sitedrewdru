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
const { theme } = useTheme();

onMounted(() => {
  document.body.style.backgroundColor = theme.value.body;
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
@import "../styles/variables.less";

* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  @media @smallest {
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
