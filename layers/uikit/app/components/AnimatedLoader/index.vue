<template>
  <div class="animated-spinner">
    <slot />

    <div
      v-if="loading"
      class="absolute inset-0 z-49 flex items-center justify-center bg-default/50"
    >
      <div class="animated-loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>

<style lang="scss">
$loaderWidth: 3rem;
$loaderHeight: 3rem;
.animated-spinner {
  position: relative;
  height: 100%;
  width: 100%;
  justify-content: center;
  .animated-loading {
    width: $loaderWidth;
    height: $loaderHeight;
    background: url("/img/animations/AnimatedLoader.svg") no-repeat 0rem 0rem;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    animation: trot-animation 0.85s step-end both infinite;
  }

  @keyframes trot-animation {
    0% {
      background-position: 100% 0%;
    }
    16% {
      background-position: 0% 0%;
    }
    32% {
      background-position: 20% 0%;
    }
    48% {
      background-position: 40% 0;
    }
    64% {
      background-position: 60% 0;
    }
    80% {
      background-position: 80% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
}
</style>
