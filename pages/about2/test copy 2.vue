<template>
<div id="home">
  <h2 class="description">This is the about page</h2>
</div>
</template>

<style lang="less">
#home {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  .description {
    font-size: x-large;
    color: white;
  }
}
</style>

<script lang="ts">
import { onMounted } from 'vue'
export default {
  head: {
    title: 'About title'
  }
}
</script>

<script lang="ts" setup>
useMeta({
  meta: [
    { name: 'description', content: 'About description' }
  ],
})
</script>