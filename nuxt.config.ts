import { safeJsonParse } from './layers/core/app/utils/stringTransform'

const UNSET_REQUIRED_VALUE = 'NOT-SET'
const ENVIROMENT = import.meta.env.NODE_ENV ?? 'development'

const isDebug = safeJsonParse<boolean>(import.meta.env.VITE_DEBUG ?? 'false') ?? false
const isDebugTools = ENVIROMENT === 'development'
const isDebugLogin = safeJsonParse<boolean>(import.meta.env.VITE_DEBUG_LOGIN ?? 'false') ?? false

const DESCRIPTION = 'Hello, my name is Drew Dru. I\'m a software engineer, tech lead, software architect, and AI engineer who enjoys building scalable systems, distributed architectures, and machine learning applications. I\'m specialising in TypeScript, Node.js, NestJS, Python, PostgreSQL, AWS, Kubernetes, and scalable distributed systems. I also known as pony who loves fantasy. Welcome to my personal website, blog, and portfolio.'
const KEYWORDS = 'DrewDru, Drew Dru, Andrew Ovsyannikov, Full Stack Developer, Full Stack Engineer, Software Engineer, Tech Lead, Software Architect, AI Engineer, Machine Learning Engineer, TypeScript Developer, Node.js Developer, NestJS Developer, Python Developer, FastAPI, Django, React, Vue, Nuxt, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ, AWS, Docker, Kubernetes, WebRTC, Nostr, Distributed Systems, Backend Developer, Frontend Developer, Portfolio, Blog, Pony'

const SEO_METADATA = [
  { name: 'author', content: 'Drew Dru' },
  { property: 'og:title', content: 'Drew Dru' },
  {
    name: 'description',
    content: DESCRIPTION
  },
  {
    property: 'og:description',
    content: DESCRIPTION
  },
  {
    name: 'keywords',
    content: KEYWORDS
  },
  { name: 'robots', content: 'index, follow' },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:image',
    content: 'https://drewdru.com/img/seo/logo_1200.png'
  },
  {
    property: 'og:vk:image',
    content: 'https://drewdru.com/img/seo/logo_1200.png'
  },
  {
    property: 'og:fb:image',
    content: 'https://drewdru.com/img/seo/logo_1200.png'
  },
  {
    property: 'og:twitter:image',
    content: 'https://drewdru.com/img/seo/logo_1200.png'
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: '@DrewDru' },
  { name: 'twitter:title', content: 'DrewDru' },
  {
    name: 'twitter:description',
    content: DESCRIPTION
  },
  { property: 'og:image:type', content: 'image/png' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:url', content: 'https://drewdru.com/' },
  { property: 'og:locale', content: 'en' },
  { property: 'og:locale:alternate', content: 'ru' }
]
const SEO_LINKS = [
  { rel: 'canonical', href: 'https://drewdru.com/en' },
  { rel: 'alternate', href: 'https://drewdru.com' },
  { rel: 'alternate', href: 'https://drewdru.com/ru' }
]
const SEO_LD_JSON = [
  {
    '@type': 'Person',
    '@id': 'https://drewdru.com/#person',
    'name': 'DrewDru',
    'alternateName': 'Andrew Ovsyannikov',
    'url': 'https://drewdru.com/',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://drewdru.com/img/seo/logo.svg'
    },
    'jobTitle': [
      'Software Engineer',
      'Full-Stack Developer',
      'Tech Lead',
      'AI Engineer'
    ],
    'sameAs': [
      'https://x.com/DrewDrux',
      'https://t.me/DrewDru',
      'https://github.com/drewdru',
      'https://career.habr.com/drew-dru',
      'https://www.linkedin.com/in/andrew-ovsyannikov-b97479169',
      'https://www.upwork.com/freelancers/~01e59297900f2b4845',
      'https://stackoverflow.com/users/7806925/drew-dru',
      'mailto:drewdrux@gmail.com'
    ],
    'areaServed': 'Worldwide',
    'email': 'drewdrux@gmail.com',
    'description': DESCRIPTION,
    'keywords': KEYWORDS
  },
  {
    '@type': 'WebSite',
    '@id': 'https://drewdru.com/#website',
    'url': 'https://drewdru.com/',
    'name': 'DrewDru',
    'abstract': DESCRIPTION,
    'description': DESCRIPTION,
    'keywords': KEYWORDS,
    'inLanguage': ['en', 'ru'],
    'publisher': {
      '@id': 'https://drewdru.com/#person'
    },
    'author': {
      '@id': 'https://drewdru.com/#person'
    },
    'creator': {
      '@id': 'https://drewdru.com/#person'
    }
  },
  {
    '@type': 'WebPage',
    '@id': 'https://drewdru.com/#home',
    'url': 'https://drewdru.com/',
    'name': 'Drew Dru',
    'isPartOf': {
      '@id': 'https://drewdru.com/#website'
    },
    'mainEntity': {
      '@id': 'https://drewdru.com/#person'
    },
    'author': {
      '@id': 'https://drewdru.com/#person'
    },
    'creator': {
      '@id': 'https://drewdru.com/#person'
    }
  },
  {
    '@type': 'ProfilePage',
    '@id': 'https://drewdru.com/#profile',
    'mainEntity': {
      '@id': 'https://drewdru.com/#person'
    }
  }
]

const RUNTIME_CONFIG = {
  isDebug,
  isDebugLogin,
  enviroment: ENVIROMENT,
  public: {
    isDebug,
    isDebugLogin
  }
}
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-svgo',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: isDebugTools
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      meta: [
        ...SEO_METADATA,
        { name: 'referrer', content: 'origin-when-cross-origin' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'X-Content-Type-Options', 'content': 'nosniff' },
        { 'http-equiv': 'Strict-Transport-Security', 'content': 'max-age=1800' },
        { 'http-equiv': 'X-Frame-Options', 'content': 'sameorigin' },
        { 'http-equiv': 'X-XSS-Protection', 'content': '1' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(SEO_LD_JSON)
        }
      ],
      link: [
        ...SEO_LINKS,
        { rel: 'icon', href: 'https://drewdru.com/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/tailwind.css'],

  site: { url: 'https://drewdru.com', name: 'DrewDru' },

  runtimeConfig: RUNTIME_CONFIG,

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    },
    server: {
      allowedHosts: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true
    },
    locales: [
      { code: 'en', name: 'English' },
      { code: 'ru', name: 'Русский' }
    ]
  },

  robots: {
    allow: '/',
    disallow: ['/auth/']
  },

  sitemap: {
    exclude: ['/auth/**'],
    autoLastmod: true,
    sortEntries: true,
    discoverImages: true,
    discoverVideos: true,
    credits: true,
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'weekly'
    }
  },

  svgo: {
    autoImportPath: false,
    svgo: true
  }

})