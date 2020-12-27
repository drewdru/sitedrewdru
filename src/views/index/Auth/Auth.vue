<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page auth">
    <div class="layout">
      <h1>{{$t('HiDrewDru')}}</h1>
      <transition name="cutie-mark" appear>
        <img class="cutie-mark" alt="Drew Dru logo" src="@/assets/logo.svg">
      </transition>
    </div>
  </div>
</template>

<script async lang="ts" src="./auth.ts"></script>
<style scoped lang="less" src="./auth.less"></style>
