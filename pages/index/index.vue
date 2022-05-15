<i18n locale="en" lang="yaml" src="./en.yml" />
<i18n locale="ru" lang="yaml" src="./ru.yml" />

<template>
  <div class="home">
    <div class="layout">
      <div class="hello">
        <h1>{{t('HiDrewDru')}}</h1>
        <transition name="cutie-mark" appear>
          <img class="cutie-mark" :alt="t('LogoAlt')" src="@/assets/logo.svg">
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.home .layout {
  display: flex;
  justify-content: center;
  flex-direction: row;
  .hello {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .cutie-mark {
    height: 60vh;
    min-height: 10rem;
    max-width: 90vw;
  }

  .cutie-mark-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .cutie-mark-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .cutie-mark-enter, .cutie-mark-leave-to {
    transform: translateX(50px);
    opacity: 0;
  }
}
</style>

<script lang="ts">
import { useI18n } from 'vue-i18n';

export default {
  head: {
    title: 'Drew Dru - Home Page'
  }
}
</script>

<script lang="ts" setup>
const {t, locale} = useI18n();
useMeta({
  meta: [
    { name: 'description', content: "Drew Dru's site" }
  ],
})
</script>