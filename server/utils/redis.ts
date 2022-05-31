import { createClient } from "redis";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();
const client = createClient({ url: config.redis.url });
client.on("error", function (error) {
  console.error(error); // eslint-disable-line no-console
});

export default client;
