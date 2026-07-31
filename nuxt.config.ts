import { safeJsonParse } from './shared/utils/stringTransform'

const UNSET_REQUIRED_VALUE = 'NOT-SET'
const ENVIRONMENT = import.meta.env.NODE_ENV ?? 'development'
const DOMAIN = import.meta.env.DOMAIN ?? 'drewdru.com'

const isDebug = safeJsonParse<boolean>(import.meta.env.VITE_DEBUG ?? 'false') ?? false
const isDebugTools = ENVIRONMENT === 'development'
const isDebugLogin = safeJsonParse<boolean>(import.meta.env.VITE_DEBUG_LOGIN ?? 'false') ?? false

const DESCRIPTION = 'Hello, my name is Drew Dru. I\'m a software engineer, tech lead, software architect, and AI engineer who enjoys building scalable systems, distributed architectures, and machine learning applications. I\'m specialising in TypeScript, Node.js, NestJS, Python, PostgreSQL, AWS, Kubernetes, and scalable distributed systems. I also known as pony who loves fantasy. Welcome to my personal website, blog, and portfolio.'
const KEYWORDS = 'DrewDru, Drew Dru, Andrew Ovsyannikov, Full Stack Developer, Full Stack Engineer, Software Engineer, Tech Lead, Software Architect, AI Engineer, Machine Learning Engineer, TypeScript Developer, Node.js Developer, NestJS Developer, Python Developer, FastAPI, Django, React, Vue, Nuxt, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ, AWS, Docker, Kubernetes, WebRTC, Nostr, Distributed Systems, Backend Developer, Frontend Developer, Portfolio, Blog, Pony'

const SEO_LOGO_1200_PATH = `https://${DOMAIN}/img/seo/logo_1200.png`
const SEO_PERSON_ID = `https://${DOMAIN}/#person`
const SEO_AUTHOR = 'Drew Dru'
const SEO_METADATA = [
  { name: 'author', content: SEO_AUTHOR },
  { property: 'og:title', content: SEO_AUTHOR },
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
    content: SEO_LOGO_1200_PATH
  },
  {
    property: 'og:vk:image',
    content: SEO_LOGO_1200_PATH
  },
  {
    property: 'og:fb:image',
    content: SEO_LOGO_1200_PATH
  },
  {
    property: 'og:twitter:image',
    content: SEO_LOGO_1200_PATH
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: '@DrewDru' },
  { name: 'twitter:title', content: 'Drew Dru' },
  {
    name: 'twitter:description',
    content: DESCRIPTION
  },
  { property: 'og:image:type', content: 'image/png' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:url', content: `https://${DOMAIN}/` },
  { property: 'og:locale', content: 'en' },
  { property: 'og:locale:alternate', content: 'ru' }
]
const SEO_LINKS = [
  { rel: 'canonical', href: `https://${DOMAIN}/en` },
  { rel: 'alternate', href: `https://${DOMAIN}` },
  { rel: 'alternate', href: `https://${DOMAIN}/ru` }
]
const SEO_LD_JSON = [
  {
    '@type': 'Person',
    '@id': SEO_PERSON_ID,
    'name': 'Drew Dru',
    'alternateName': 'Andrew Ovsyannikov',
    'url': `https://${DOMAIN}/`,
    'logo': {
      '@type': 'ImageObject',
      'url': `https://${DOMAIN}/img/seo/logo.svg`
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
    '@id': `https://${DOMAIN}/#website`,
    'url': `https://${DOMAIN}/`,
    'name': 'Drew Dru',
    'abstract': DESCRIPTION,
    'description': DESCRIPTION,
    'keywords': KEYWORDS,
    'inLanguage': ['en', 'ru'],
    'publisher': {
      '@id': SEO_PERSON_ID
    },
    'author': {
      '@id': SEO_PERSON_ID
    },
    'creator': {
      '@id': SEO_PERSON_ID
    }
  },
  {
    '@type': 'WebPage',
    '@id': `https://${DOMAIN}/#home`,
    'url': `https://${DOMAIN}/`,
    'name': SEO_AUTHOR,
    'isPartOf': {
      '@id': `https://${DOMAIN}/#website`
    },
    'mainEntity': {
      '@id': SEO_PERSON_ID
    },
    'author': {
      '@id': SEO_PERSON_ID
    },
    'creator': {
      '@id': SEO_PERSON_ID
    }
  },
  {
    '@type': 'ProfilePage',
    '@id': `https://${DOMAIN}/#profile`,
    'mainEntity': {
      '@id': SEO_PERSON_ID
    }
  }
]

const i18nLocales = [
  { code: 'en', name: 'English', file: 'en.ts' },
  { code: 'ru', name: 'Русский', file: 'ru.ts' }
]
const locales = i18nLocales.map(item => item.code)

const RUNTIME_CONFIG = {
  isDebug,
  isDebugLogin,
  environment: ENVIRONMENT,
  secret: import.meta.env.SECRET,
  locales,
  rateLimit: {
    defaultLimitMs: Number.parseInt(import.meta.env.DEFAULT_RATE_LIMIT ?? '100', 10) || 100,
    defaultMaxRequestTries: Number.parseInt(import.meta.env.DEFAULT_MAX_BAD_REQUESTS_LIMIT ?? '100', 10) || 100,
    visitorDataMaxAgeSeconds: Number.parseInt(import.meta.env.VISITOR_DATA_MAX_AGE_SECONDS ?? '604800', 10) || 604800, // 7d
    maxRecaptchaErrors: Number.parseInt(import.meta.env.MAX_RECAPTCHA_ERRORS ?? '3', 10) || 3,
  },
  webhooks: {
    serverApiKey: import.meta.env.SERVER_API_KEY ?? UNSET_REQUIRED_VALUE,
  },
  google: {
    projectId: import.meta.env.GOOGLE_PROJECT_ID ?? UNSET_REQUIRED_VALUE,
    apiKey: import.meta.env.GOOGLE_API_KEY ?? UNSET_REQUIRED_VALUE,
  },
  lastFm: {
    apiKey: import.meta.env.LAST_FM_API_KEY ?? UNSET_REQUIRED_VALUE,
    username: import.meta.env.LAST_FM_USERNAME ?? UNSET_REQUIRED_VALUE,
  },
  public: {
    isDebug,
    isDebugLogin,
    google: {
      recaptcha: {
        v2SiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? UNSET_REQUIRED_VALUE,
      }
    }
  }
}
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/content', '@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', 'nuxt-svgo', 'motion-v/nuxt', '@pinia/nuxt', '@vueuse/nuxt'],

  components: [
    { path: '~/components', extensions: ['vue', 'tsx'] },
    {
      path: '~~/layers/uikit/app/components/Prose',
      prefix: 'Prose',
      extensions: ['vue', 'tsx'],
      global: true
    }
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
        { rel: 'icon', href: `https://${DOMAIN}/favicon.ico` }
      ]
    }
  },

  css: ['~/assets/css/tailwind.css'],

  site: { url: 'https://drewdru.com', name: 'DrewDru' },
  content: {
    renderer: {
      anchorLinks: false
    }
  },

  runtimeConfig: RUNTIME_CONFIG,

  routeRules: {
    '/': { prerender: false }
  },

  compatibilityDate: '2025-01-15',
  nitro: {
    experimental: {
      openAPI: true
    },
    openAPI: {
      production: false,
      ui: {
        scalar: {
          darkMode: true,
          url: '/docs/_openapi.json',
          route: '/docs'
        }
      },
      meta: {
        title: 'Personal Site API',
        description: 'API documentation for my pesronal site',
        version: '1.0.0'
      }
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod/v4'
      ]
    },
    server: {
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'drewdru.local',
        'career.drewdru.local',
        'dev.drewdru.local'
      ]
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
    langDir: 'locales',
    locales: i18nLocales
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
