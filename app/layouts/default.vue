<template>
  <div class="min-h-screen flex flex-col">
    <UHeader>
      <template #left>
        <AppLogo :full="true" />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/drewdru/sitedrewdru"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator>
      <AppLogo class="h-4 w-auto text-toned" />
    </USeparator>

    <UFooter>
      <template #left>
        <p class="text-sm text-toned">
          Drew Dru © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/drewdru/sitedrewdru"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '~~/layers/uikit/app/components/AppLogo/index.vue'
</script>
