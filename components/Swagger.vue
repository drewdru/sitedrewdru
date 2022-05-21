<template>
  <div id="swagger-ui"></div>
</template>
<!--
<script>
export default {
  head() {
    return {
      script: [
        {
          type: "text/javascript",
          src: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-bundle.min.js",
          async: "async",
          defer: true,
        },
        {
          type: "text/javascript",
          src: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-standalone-preset.min.js",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui.min.css",
        },
      ],
    };
  },
};
</script> -->

<script lang="ts" setup>
useHead({
  script: [
    {
      type: "text/javascript",
      src: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-bundle.min.js",
      async: true,
    },
    {
      type: "text/javascript",
      src: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui-standalone-preset.min.js",
      async: true,
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.11.1/swagger-ui.min.css",
    },
  ],
});
if (process.client) {
  const config = useRuntimeConfig();
  const ui = SwaggerUIBundle({ // eslint-disable-line
    url: `//${config.VITE_DOMAIN_NAME}/api/docs`,
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis, // eslint-disable-line
      SwaggerUIStandalonePreset // eslint-disable-line
    ],
    layout: "StandaloneLayout",
  });
  window.ui = ui;
}
</script>
