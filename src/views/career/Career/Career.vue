<i18n src="./en.yaml"></i18n>
<i18n src="./ru.yaml"></i18n>

<template>
  <div class="page career">
    <div class="layout">
      <div class="card">
        <div class="about">
          <img class="andrew" alt="Andrew Ovsyannikov" src="@/assets/andrew.png">
          <div class="bio">
            <h1>{{$t('HiAndrew')}}</h1>
            <h2>{{$t('HiAndrew2')}} {{experience}} {{$t('HiAndrew3')}}</h2>
          </div>
        </div>
        <div class="social-media">
          <a class="logo" href="//github.com/drewdru">
            <img class="logo" alt="Drew Dru on GitHub" src="@/assets/github.svg">
          </a>
          <a class="logo" href="//career.habr.com/drew-dru">
            <img class="logo" alt="Drew Dru on Habr career" src="@/assets/habr.jpg">
          </a>
          <a class="logo" href="//www.linkedin.com/in/andrew-ovsyannikov-b97479169/">
            <img class="logo" alt="Drew Dru on Linkedin" src="@/assets/linkedin.svg">
          </a>
          <a class="logo" href="//t.me/DrewDru/">
            <img class="logo" alt="Drew Dru on Telegram" src="@/assets/telegram.svg">
          </a>
        </div>
      </div>
    </div>    
  </div>
</template>

<script async lang="ts" src="./career.ts"></script>
<style scoped lang="less" src="./career.less"></style>
