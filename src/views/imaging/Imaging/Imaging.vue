<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page imaging">
    <HelloWorld :msg="$t('Description')"></HelloWorld>
  </div>
</template>

<script async lang="ts" src="./imaging.ts"></script>
<style scoped lang="less" src="./imaging.less"></style>
