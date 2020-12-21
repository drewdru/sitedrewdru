<i18n src="@/constants/en.yaml"></i18n>
<i18n src="@/constants/ru.yaml"></i18n>
<template>
  <div id="app" 
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
    :class="{'user-is-tabbing': isTabbing}"
  >
    
    <NavBar/>
    <router-view/>
  </div>
</template>

<style lang="less" src="@/app.less"></style>
<script async lang="ts" src="@/app.ts"></script>
