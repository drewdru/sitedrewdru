
<i18n>
  en:
    hiDrewDru: Hi, I'm Drew Dru
  ru:
    hiDrewDru: Привет, я Drew Dru
</i18n>

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
