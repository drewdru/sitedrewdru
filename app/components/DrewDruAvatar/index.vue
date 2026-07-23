<i18n locale="en" lang="yaml" src="./locales/en.yml" />

<i18n locale="ru" lang="yaml" src="./locales/ru.yml" />

<template>
  <UPopover
    :open="isBoopMessage"
    :content="{ side: 'top' }"
    :ui="{
      content: 'drewdru-avatar-message-popup'
    }"
  >
    <template #content>
      <UContainer>{{ t(`BoopText${boopTextNumber}`) }}</UContainer>
    </template>
    <div
      v-if="isPerson"
      class="relative size-30 transition-transform duration-300"
      :class="{ '-scale-x-100': isMirrored }"
    >
      <UAvatar
        v-if="isMirrored"
        class="size-30 ring ring-default ring-offset-3 ring-offset-bg"
        :srcset="drewdruAvatarSrcset"
        :class="{ 'animate-bounce-once': isBouncing }"
        alt="Drew Dru by Bakery: [Telegram](https://t.me/bakery_3112), [VK](https://vk.com/bakery_3112), [VK donut](https://vk.com/donut/bakery_3112), [Derpibooru](https://derpibooru.org/profiles/Bakery), [X](https://x.com/Bakery3112), [Boosty](https://boosty.to/bakery3112)"
        src="/img/avatars/drewdru.png"
        @click="toggleMirror"
      />
      <UAvatar
        v-else
        class="size-30 ring ring-default ring-offset-3 ring-offset-bg"
        :srcset="andrewAvatarSrcset"
        :class="{ 'animate-bounce-once': isBouncing }"
        alt="Andrew Ovsyannikov"
        src="/img/avatars/andrew_blog.jpg"
        @click="toggleMirror"
      />
    </div>
    <div
      v-else
      class="relative size-30 transition-transform duration-300"
      :class="{ '-scale-x-100': isMirrored }"
    >
      <UAvatar
        v-if="mirrorClicksCounter % 10 === 0"
        class="size-30 ring ring-default ring-offset-3 ring-offset-bg"
        :srcset="andrewAvatarSrcset"
        :class="{ 'animate-bounce-once': isBouncing }"
        alt="Andrew Ovsyannikov"
        src="/img/avatars/andrew_blog.jpg"
        @click="toggleMirror"
      />
      <UAvatar
        v-else
        class="size-30 ring ring-default ring-offset-3 ring-offset-bg"
        :srcset="drewdruAvatarSrcset"
        :class="{ 'animate-bounce-once': isBouncing }"
        alt="Drew Dru by Bakery: [Telegram](https://t.me/bakery_3112), [VK](https://vk.com/bakery_3112), [VK donut](https://vk.com/donut/bakery_3112), [Derpibooru](https://derpibooru.org/profiles/Bakery), [X](https://x.com/Bakery3112), [Boosty](https://boosty.to/bakery3112)"
        src="/img/avatars/drewdru.png"
      />

      <button
        aria-label="Mirror"
        class="absolute left-[45%] top-[40%] size-6 rounded-full cursor-pointer"
        :class="{
          'w-full': mirrorClicksCounter % 10 === 0,
          'h-full': mirrorClicksCounter % 10 === 0
        }"
        @click="toggleMirror"
      />

      <button
        class="absolute left-[37%] top-[55%] size-3 -translate-x-1/2 cursor-pointer"
        aria-label="Boop"
        @click="showBoop"
      />

      <button
        class="absolute left-[30%] top-[10%] size-7 cursor-pointer"
        aria-label="Magic"
        @click="playMagic"
      />

      <div
        v-if="isMagicSparkles"
        class="magic-sparkles pointer-events-none absolute left-[45%] top-[30%]"
      >
        <span
          v-for="i in 8"
          :key="`normal-${i}`"
          class="spark"
          :style="sparkStyle(i)"
        />

        <span
          v-for="i in 8"
          :key="`glow-${i}`"
          class="spark spark-glow"
          :style="sparkStyle(i)"
        />

        <span
          v-for="i in 4"
          :key="`big-${i}`"
          class="spark spark-big"
          :style="sparkStyle(i)"
        />

        <span
          v-for="i in 6"
          :key="`orb-${i}`"
          class="spark-orb"
          :style="{
            ...sparkStyle(i),
            '--size': `${6 + Math.random() * 8}px`
          }"
        />
      </div>
    </div>
  </UPopover>
</template>

<script setup lang="ts">
defineProps({
  isPerson: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()
const img = useImage()
const drewdruAvatarSrcset = img.getSizes('/img/avatars/drewdru.png', {
  sizes: 'sm:200px md:200px lg:200px xl:200px',
  modifiers: { fit: 'cover', format: 'webp', quality: 80 }
}).srcset
const andrewAvatarSrcset = img.getSizes('/img/avatars/andrew_blog.jpg', {
  sizes: 'sm:200px md:200px lg:200px xl:200px',
  modifiers: { fit: 'cover', format: 'webp', quality: 80 }
}).srcset

const boopTextNumber = ref(randomInt(1, 17))
const isMirrored = ref(false)
const isBoopMessage = ref(false)
const isMagicSparkles = ref(false)
const isBouncing = ref(false)
const mirrorClicksCounter = ref(2)

const toggleMirror = () => {
  mirrorClicksCounter.value += 1
  isMirrored.value = !isMirrored.value
}

let boopTimer: ReturnType<typeof setTimeout>
const showBoop = () => {
  clearTimeout(boopTimer)
  isBoopMessage.value = true
  isBouncing.value = true
  boopTextNumber.value = randomInt(1, 17)

  boopTimer = setTimeout(() => {
    isBoopMessage.value = false
    isBouncing.value = false
  }, 1350)
}

let magicTimer: ReturnType<typeof setTimeout>
const playMagic = () => {
  clearTimeout(magicTimer)
  isMagicSparkles.value = true

  magicTimer = setTimeout(() => {
    isMagicSparkles.value = false
  }, 1500)
}

const sparkStyle = (i: number) => ({
  '--x': `${-20 - Math.random() * 60}px`,
  '--y': `${-20 - Math.random() * 70}px`,
  '--delay': `${i * 50}ms`
})
</script>

<style lang="scss">
.magic-sparkles {
  width: 0;
  height: 0;
  transform: rotate(15deg);

  .spark {
    position: absolute;

    width: 5px;
    height: 5px;

    clip-path: polygon(
      50% 0%,
      100% 50%,
      50% 100%,
      0% 50%
    );

    background: #3786fc;

    box-shadow:
      0 0 8px #3786fc,
      0 0 20px #3786fc;

    opacity: 0;

    animation: spark-move 1.8s ease-out var(--delay) forwards;

    &.spark-glow {
      animation:
        spark-move 1.8s ease-out var(--delay) forwards,
        spark-color 1.8s steps(1, end) var(--delay) forwards;
    }

    &.spark-big {
      width: 9px;
      height: 9px;

      box-shadow:
        0 0 12px #3786fc,
        0 0 30px #3786fc;
    }
  }

  @keyframes spark-move {
    0% {
      opacity: 0;
      transform:
        translate(0, 0)
        scale(0);
    }

    20% {
      opacity: 1;
      transform:
        translate(-5px, -5px)
        scale(1.3);
    }

    70% {
      opacity: .8;
      transform:
        translate(var(--x), var(--y))
        scale(1);
    }

    100% {
      opacity: 0;

      transform:
        translate(
          calc(var(--x) - 10px),
          calc(var(--y) - 10px)
        )
        scale(0);
    }
  }

  @keyframes spark-color {
    0%,
    25% {
      background: #3786fc;

      box-shadow:
        0 0 8px #3786fc,
        0 0 20px #3786fc;
    }

    26%,
    55% {
      background: #ffffff;

      box-shadow:
        0 0 10px #ffffff,
        0 0 25px #ffffff;
    }

    56%,
    100% {
      background: #3786fc;

      box-shadow:
        0 0 8px #3786fc,
        0 0 20px #3786fc;
    }
  }

  .spark-orb {
    width: var(--size);
    height: var(--size);

    position: absolute;
    border-radius: 50%;

    background: #3786fc;

    filter: blur(5px);

    opacity: 0;

    box-shadow:
      0 0 15px #3786fc,
      0 0 35px #3786fc,
      0 0 60px #3786fc;

    animation: orb-float 2s ease-out var(--delay) forwards;
  }
  @keyframes orb-float {
    0% {
      opacity: 0;

      transform:
        translate(0, 0)
        scale(.3);
    }

    20% {
      opacity: .8;

      transform:
        translate(-10px, -10px)
        scale(1);
    }

    50% {
      opacity: .6;

      transform:
        translate(var(--x), var(--y))
        scale(1.2);
    }

    100% {
      opacity: 0;

      transform:
        translate(calc(var(--x) - 20px), calc(var(--y) - 20px))
        scale(.2);
    }
  }
}

.animate-bounce-once {
  animation: bounce-once 400ms ease;
}

@keyframes bounce-once {
  0% { transform: scale(1); }
  35% { transform: scale(1.08) translateY(-6px); }
  60% { transform: scale(.96) translateY(2px); }
  100% { transform: scale(1) translateY(0); }
}

.drewdru-avatar-message-popup {
  &::after {

    content: "";
    position: absolute;

    width: 0;
    height: 0;

    right: auto;
    top: auto;
    bottom: -1rem;
    left: 50%;

    transform: translateX(-50%);

    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 16px solid var(--ui-bg-elevated);
    border-bottom: 0;

    filter: drop-shadow(0 1px 0 var(--ui-border));
  }
}
</style>
