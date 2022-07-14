<template>
  <div id="swagger-ui"></div>
</template>

<script lang="ts" setup>
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist";
if (process.client) {
  const config = useRuntimeConfig();
  SwaggerUIBundle({
    url: `//${config.VITE_DOMAIN_NAME}/api/docs`,
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "StandaloneLayout",
  });
}
</script>
<style src="swagger-ui-dist/swagger-ui.css"></style>
