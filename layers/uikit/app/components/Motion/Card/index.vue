<template>
  <UContainer>
    <Motion
      :class="bubbleRight && 'bubble-card'"
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)'
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)'
      }"
      :transition="{
        duration: 0.6,
        delay
      }"
    >
      <UCard>
        <slot />
      </UCard>
    </Motion>
  </UContainer>
</template>

<script setup lang="ts">
defineProps({
  delay: {
    type: Number,
    default: 0
  },
  bubbleRight: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
.bubble-card {
  position: relative;
  border-radius: 1.5rem;
  overflow: visible;

  &::after {
    content: "";
    position: absolute;

    right: -1rem;
    top: 3rem;

    width: 0;
    height: 0;

    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 16px solid var(--ui-bg-elevated);

    filter: drop-shadow(1px 0 0 var(--ui-border));

  }
  @media (max-width: 1023px) {
    &::after {
      right: auto;
      top: auto;
      bottom: -1rem;
      left: 50%;

      transform: translateX(-50%);

      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 16px solid var(--ui-bg-elevated);
      border-bottom: 0;

      filter: drop-shadow(0 1px 0 var(--ui-border));
    }
  }
}
</style>
