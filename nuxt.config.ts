import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'server',
  },
  meta: {
	},
	build: {
		postcss: {
			postcssOptions: require('./postcss.config'),
		},
	},
	buildModules: ['@intlify/nuxt3'],
	publicRuntimeConfig: {
    VITE_DOMAIN_NAME: process.env.VITE_DOMAIN_NAME,
  }
})
