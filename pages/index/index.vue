<template>
  <div class="home">
    <div class="layout">
      <h1>{{$t('IndexPage.HiDrewDru')}}</h1>
      <transition name="cutie-mark" appear>
        <img class="cutie-mark" alt="Drew Dru logo" src="@/assets/logo.svg">
      </transition>
    </div>
  </div>
</template>

<style lang="less">
.home .layout {
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
export default {
  head: {
    title: 'Drew Dru - Home Page'
  }
}
</script>

<script lang="ts" setup>
useMeta({
  meta: [
    { name: 'description', content: "Drew Dru's site" }
  ],
})
</script>