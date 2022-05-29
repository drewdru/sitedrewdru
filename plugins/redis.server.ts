import { useRuntimeConfig, defineNuxtPlugin } from "#app";
import { createClient } from "redis";

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig();
  const client = createClient({ url: config.redis.url });
  client.on("error", function (error) {
    console.error(error); // eslint-disable-line no-console
  });
  client.connect();
});