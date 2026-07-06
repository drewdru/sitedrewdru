<template>
  <NuxtLink
    :to="domainUrl('/')"
    class="group inline-flex items-center gap-2 text-toned hover:text-primary transition-colors"
  >
    <Logo class="h-6 w-auto text-current group-hover:text-primary transition-colors" />
    <span v-if="full" class="font-heading font-semibold text-2xl">
      Drew Dru
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import Logo from '~/assets/img/logo/logo.svg?component'
import { useCurrentDomainUrl } from '~~/layers/core/app/composables/subdomainUrl'

const domainUrl = useCurrentDomainUrl()
defineProps({
  full: {
    type: Boolean,
    default: false
  }
})
</script>
