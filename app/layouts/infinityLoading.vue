<template>
  <div class="min-h-screen flex flex-col">
    <AnimatedLoader :loading="true">
      <UMain>
        <slot />
      </UMain>
    </AnimatedLoader>
  </div>
</template>
