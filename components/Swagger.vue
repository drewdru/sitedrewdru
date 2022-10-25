<template>
  <div id="swagger-ui" ref="swaggerDomNode"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist";
const swaggerDomNode = ref(null);

onMounted(() => {
  const config = useRuntimeConfig();
  SwaggerUIBundle({
    // dom_id: "#swagger-ui",
    domNode: swaggerDomNode.value,
    spec: {
      url: `//${config.VITE_DOMAIN_NAME}/api/docs`,
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      layout: "StandaloneLayout",
    },
  });
});
</script>
<style src="swagger-ui-dist/swagger-ui.css"></style>
