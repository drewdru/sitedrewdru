<template>
  <div id="home">
    <h2 class="description">This is the about page</h2>
  </div>
</template>

<script lang="ts">
export default {
  head: {
    title: "About title",
  },
};
</script>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
useHead({
  meta: [{ name: "description", content: "About description" }],
});
</script>

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
