import { defineNuxtConfig } from "nuxt3";
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
      postcssOptions: require("./postcss.config"),
    },
  },
  buildModules: ["@intlify/nuxt3"],
  publicRuntimeConfig: {
    VITE_DOMAIN_NAME: process.env.VITE_DOMAIN_NAME,
    subdomains: [
      { name: "index", path: `//${process.env.VITE_DOMAIN_NAME}` },
      { name: "career", path: `//career.${process.env.VITE_DOMAIN_NAME}` },
      { name: "musong", path: `//musong.${process.env.VITE_DOMAIN_NAME}` },
      { name: "imaging", path: `//imaging.${process.env.VITE_DOMAIN_NAME}` },
      { name: "webgl", path: `//webgl.${process.env.VITE_DOMAIN_NAME}` },
    ],
  },
});
