<template>
  <NuxtLink
    :to="to ?? domainUrl('/')"
    class="group inline-flex items-center gap-2 text-toned hover:text-primary transition-colors"
  >
    <Logo class="h-6 w-auto text-current group-hover:text-primary transition-colors" />
  </NuxtLink>
</template>

<script setup lang="ts">
import Logo from '~/assets/img/logo/logo_with_text.svg?component'
import { useCurrentDomainUrl } from '~~/layers/core/app/composables/subdomainUrl'

const domainUrl = useCurrentDomainUrl()
defineProps<{ to?: string }>()
</script>
