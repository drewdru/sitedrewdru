<template>
  <UPopover
    :content="{ side: 'top', align: 'start' }"
    :open="isOpen"
  >
    <UButton
      variant="ghost"
      class="font-mono cursor-grab text-mono text-base text-left m-0 p-0 hover:bg-transparent active:bg-transparent"
      @pointerdown="startPetting"
      @pointerup="stopPetting"
      @pointerleave="stopPetting"
      @pointercancel="stopPetting"
    >
      <pre>{{ currentPose }}</pre>
    </UButton>
    <template #content>
      <audio ref="audioPurring" preload="auto" class="hidden" />
      <div class="px-4 py-2 font-mono">
        {{ kyushaMessage }}
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const audioPurring = ref<HTMLAudioElement>()
const isOpen = ref(false)

const idlePoses = [
  `⠀╱|、
(˚ˎ 。7
|、˜〵
じしˍ,)ノ`,

  `⠀╱|、
(•ˎ •7
|、˜〵
じしˍ,)ノ`,

  `⠀╱|、
(¬‿¬ 7
|、˜〵
じしˍ,)ノ`
]

const pettingPoses = [
  `⠀╱|、
(≧◡≦)7
|、˜〵
じしˍ,)ノ`,

  `⠀╱|、
(♡ˎ♡ 7
|、˜〵
じしˍ,)ノ`,

  `⠀╱|、
(•ᴗ< 7
|、˜〵
じしˍ,)ノ`
]

const rarePose = [
  `⠀╱|、 zZ
(－˘ －)
|、˜〵
じしˍ,)ノ`,
  `⠀╱|、
(⊙ˎ⊙ 7
|、˜〵
じしˍ,)ノ`,
  `⠀╱|、
(⊙ˎ⊙ 7
|、˜〵
じしˍ,)ノ`,
  `⠀╱|、
(◡_◡ 7
|、˜〵
じしˍ,)ノ`,
  `⠀╱|、
(¬_¬ 7
|、˜〵
じしˍ,)ノ`
]

const pettingMessages = [
  'Kyusha is purring ♥',
  'That feels nice ♥',
  'More pets please~',
  'Prrrrr...',
  'I like it ♥',
  `Don't stop yet ฅ^•ﻌ•^ฅ`,
  'So happy!',
  'This is the best spot ♥',
  'Kyusha approves ♥',
  'Keep going... purr purr~',
  'I could stay like this forever ♥',
  'Your hand is very comfy~',
  'More love, please ♥',
  'Nyaa~ that feels good!',
  'Kyusha is very pleased',
  'Purrrrrrrrr...',
  'Happy cat noises ♥',
  'This moment is perfect~',
  'You are a good human ♥',
  'Five more minutes? ฅ^•ω•^ฅ',
  `Don't wake me from this happiness~`,
  'Kyusha is melting ♥',
  'A little more, please~',
  'This is my favorite thing!',
  'You made Kyusha smile ♥',
  'Soft pets, soft feelings~',
  'Kyusha feels loved',
  'You may continue ♥',
  'You have earned head pats privileges ♥',
  'Kyusha has decided you are nice',
  'Your petting skills are improving~',
  'Kyusha will remember this kindness ♥',
  'You are officially a cat friend!',
  'The floof demands more attention!'
]

function randomItem<T>(arr: T[]) {
  const value = arr[Math.floor(Math.random() * arr.length)]
  return value as T
}
const currentPose = ref(randomItem(idlePoses))
const kyushaMessage = ref(randomItem(pettingMessages))
let pettingInterval: ReturnType<typeof setInterval>
let closeTimer: ReturnType<typeof setTimeout>

const runRandomPurring = () => {
  if (!audioPurring.value) {
    return
  }
  audioPurring.value.src = `/audio/purring/${Math.floor(Math.random() * 5) + 1}.mp3`
  audioPurring.value.play()
}

const runRandomMeow = async () => {
  const audio = new Audio()
  audio.src = `/audio/meows/${Math.floor(Math.random() * 14) + 1}.mp3`
  audio.volume = 1
  await audio.load()
  await audio.play()
}

const startPetting = () => {
  clearInterval(pettingInterval)
  clearTimeout(closeTimer)

  kyushaMessage.value = randomItem(pettingMessages)
  isOpen.value = true

  pettingInterval = setInterval(() => {
    currentPose.value = randomItem(pettingPoses)
    runRandomPurring()
  }, 1350)
}

const stopPetting = () => {
  clearTimeout(closeTimer)
  clearInterval(pettingInterval)

  closeTimer = setTimeout(() => {
    isOpen.value = false

    if (Math.random() < 0.2) {
      currentPose.value = randomItem(rarePose)
      runRandomMeow()
    } else {
      currentPose.value = randomItem(idlePoses)
    }
  }, 1000)
}
</script>
