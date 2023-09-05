import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: {
    plugins: [eslintPlugin()],
  },
  nitro: {
    preset: "server",
  },
  meta: {},
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          autoprefixer: {},
        },
      },
    },
  },
  buildModules: ["@intlify/nuxt3"],
  privateRuntimeConfig: {
    enviroment: process.env.NODE_ENV,
    jwt: {
      secret: process.env.JWT_SECRET,
      expires: process.env.JWT_EXPIRES,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpires: process.env.JWT_REFRESH_EXPIRES,
    },
    mongodb: {
      url: process.env.DATABASE_URL,
      options: {
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
      },
    },
    redis: {
      url: process.env.REDIS_URL,
    },
  },
  publicRuntimeConfig: {
    VITE_DOMAIN_NAME: process.env.VITE_DOMAIN_NAME,
    VITE_SUBDOMAINS: [
      { name: "index", path: `//${process.env.VITE_DOMAIN_NAME}` },
      { name: "career", path: `//career.${process.env.VITE_DOMAIN_NAME}` },
      { name: "musong", path: `//musong.${process.env.VITE_DOMAIN_NAME}` },
      { name: "imaging", path: `//imaging.${process.env.VITE_DOMAIN_NAME}` },
      { name: "webgl", path: `//webgl.${process.env.VITE_DOMAIN_NAME}` },
    ],
  },
});
