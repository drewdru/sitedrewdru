<template>
  <div class="h-screen flex flex-col lg:overflow-hidden overflow-auto">
    <UMain class="h-full">
      <UPageHero
        class="h-full"
        :ui="{
          title: 'font-heading',
          container: 'py-0 sm:py-0 lg:py-0 sm:px-0',
          body: 'p-0 my-5'
        }"
      >
        <template #top>
          <UContainer class="flex justify-center p-2">
            <AppLogoWithText class="h-6 w-auto text-current group-hover:text-primary transition-colors" />
          </UContainer>
        </template>
        <template #body>
          <UPage
            class="h-full"
            :ui="{
              root: 'lg:gap-1',
              left: 'order-1',
              center: 'order-2',
              right: 'order-3 lg:px-0'
            }"
          >
            <template #left>
              <UContainer>
                <UPageAnchors
                  :links="[
                    {
                      label: 'link 1',
                      icon: 'i-lucide-book-open',
                      to: '/docs/getting-started'
                    },
                    {
                      label: 'link 2',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 3',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 4',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 5',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 6',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 7',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 8',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 9',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    },
                    {
                      label: 'link 10 - max',
                      icon: 'i-lucide-box',
                      to: '/docs/components'
                    }
                  ]"
                  :ui="{
                    list: 'flex flex-row flex-wrap gap-x-4 gap-y-2 lg:flex-col',
                    link: 'whitespace-nowrap'
                  }"
                />
              </UContainer>
            </template>
            <template #default>
              <MotionCard
                class="my-5 lg:my-0"
                :bubble-right="true"
              >
                <UScrollArea
                  shadow
                  class="p-1 h-full lg:h-[calc(100vh-12rem)]"
                  :ui="{ viewport: 'gap-4' }"
                >
                  <slot />
                </UScrollArea>
              </MotionCard>
            </template>
            <template #right>
              <UContainer
                :ui="{
                  base: 'w-full flex flex-col gap-4'
                }"
              >
                <UContainer>
                  <UAvatar
                    class="size-30 ring ring-default ring-offset-3 ring-offset-bg"
                    :srcset="avatarSrcset"
                    alt="Drew Dru"
                    src="/img/avatars/drewdru.png"
                  />
                </UContainer>
                <UScrollArea
                  shadow
                  class="p-1 h-full lg:h-[calc(100vh-17.5rem)] min-h-[10rem]"
                  :ui="{ viewport: 'gap-4' }"
                >
                  <UCard :ui="{ body: 'lg:p-1' }">
                    <UScrollArea
                      shadow
                      class="p-1 h-33"
                    >
                      {{ data }}
                    </UScrollArea>
                  </UCard>
                  <UCard :ui="{ body: 'lg:p-1' }">
                    <UScrollArea
                      shadow
                      class="p-1 h-33"
                    >
                      {{ data }}
                    </UScrollArea>
                  </UCard>
                </UScrollArea>
              </UContainer>
            </template>
          </UPage>
        </template>
        <template #bottom>
          <UFooter>
            <template #left>
              <p class="text-sm text-toned">
                Drew Dru © {{ new Date().getFullYear() }}
              </p>
            </template>

            <template #right>
              <ULocaleSelect
                variant="ghost"
                :model-value="locale"
                :locales="(locales as Locale<any>[])"
                @update:model-value="setLocale($event as typeof locale)"
              />
              <UColorModeButton />
              <UButton
                to="https://github.com/drewdru/sitedrewdru"
                target="_blank"
                icon="i-simple-icons-github"
                aria-label="GitHub"
                color="neutral"
                variant="ghost"
              />
            </template>
          </UFooter>
        </template>
      </UPageHero>
    </UMain>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@nuxt/ui'

const { locale, setLocale, locales } = useI18n()

useHead({
  htmlAttrs: { lang: locale.value },
  titleTemplate: 'Drew Dru - %s',
  bodyAttrs: {
    class: 'blog-body'
  }
})

const img = useImage()
const avatarSrcset = img.getSizes('/img/avatars/drewdru.png', {
  sizes: 'sm:200px md:200px lg:200px xl:200px',
  modifiers: { fit: 'cover', format: 'webp', quality: 80 }
}).srcset

const { data } = await useFetch(`/api/lastfm/user/drew-dru`)
</script>

<style lang="scss">
.blog-body {
  min-height: 100vh;
  background: var(--ui-bg);

  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: fixed;
    inset: -8%;
    background-image:
      radial-gradient(
        var(--fantasy-color),
        color-mix(in srgb, var(--fantasy-color-soft) 30%, transparent) 2px,
        transparent 31px
      ),
      radial-gradient(
        ellipse at center,
        var(--fantasy-color),
        color-mix(in srgb, var(--fantasy-color-soft) 25%, transparent) 1.3px,
        transparent 47px
      ),
      radial-gradient(
        var(--fantasy-color),
        color-mix(in srgb, var(--fantasy-color-soft) 20%, transparent) 2.6px,
        transparent 36px
      ),
      radial-gradient(
        ellipse at center,
        color-mix(in srgb, var(--fantasy-color-soft) 40%, transparent),
        color-mix(in srgb, var(--fantasy-color) 20%, transparent) 0.9px,
        transparent 53px
      ),
      radial-gradient(
        ellipse at center,
        color-mix(in srgb, var(--fantasy-color-soft) 40%, transparent),
        color-mix(in srgb, var(--fantasy-color) 20%, transparent) 0.9px,
        transparent 53px
      );

    background-size:
      587px 541px,
      331px 377px,
      257px 239px,
      163px 181px,
      433px 541px;

    background-position:
      13px 41px,
      182px 67px,
      91px 311px,
      244px 149px;

    animation:
      starsPulse 8s cubic-bezier(.42,0,.22,1) infinite,
      starsMove 111s cubic-bezier(.32,0,.12,1) infinite alternate,
      starsFloat 111s cubic-bezier(.52,0,.32,1) infinite alternate;

    animation-timing-function:
      ease,
      cubic-bezier(.6,0,.3,1),
      cubic-bezier(.52,0,.32,1);

    z-index: -1;
  }

  &::after {
    content: "";
    position: fixed;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, var(--ui-bg) 60%, transparent),
      color-mix(in srgb, var(--ui-bg-accented) 60%, transparent)
    );
    z-index: -2;
  }
}

@keyframes starsPulse {
  0%,
  100% {
    opacity: .55;
    filter: brightness(.8);
  }

  50% {
    opacity: 1;
    filter: brightness(1.35);
  }
}

@keyframes starsMove {
  0% {
    background-position:
      0 0,
      40px 60px,
      130px 270px,
      70px 100px;
  }

  18% {
    background-position:
      18px -12px,
      25px 80px,
      170px 230px,
      95px 70px;
  }

  37% {
    background-position:
      -5px 30px,
      60px 45px,
      150px 190px,
      120px 110px;
  }

  61% {
    background-position:
      40px 10px,
      -10px 100px,
      220px 210px,
      130px 30px;
  }

  83% {
    background-position:
      60px 55px,
      -35px 135px,
      190px 170px,
      170px 50px;
  }

  100% {
    background-position:
      80px 40px,
      -40px 120px,
      200px 180px,
      150px 40px;
  }
}

@keyframes starsFloat {
  0% {
    transform: translate(0,0) rotate(0deg) scale(1);
  }

  30% {
    transform: translate(-8px,12px) rotate(.3deg) scale(1.01);
  }

  70% {
    transform: translate(12px,-10px) rotate(-.2deg) scale(.995);
  }

  100% {
    transform: translate(25px,8px) rotate(.4deg) scale(1.015);
  }
}
</style>
