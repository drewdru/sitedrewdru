<i18n src="./ru.yaml" lang="yaml"></i18n>
<i18n src="./en.yaml" lang="yaml"></i18n>

<template>
  <div class="home">
    <HelloWorld msg="Hi, I'm Drew Dru"></HelloWorld>
    {{$t('hiDrewDru')}}
    <transition name="cutie-mark" appear>
      <img class="cutie-mark" alt="Drew Dru logo" src="@/assets/logo.svg">
    </transition>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>
<style scoped lang="less" src="./home.less"></style>
