<script setup lang="ts">
import { gsap } from 'gsap'
import { nextTick, onMounted, ref } from 'vue'

const props = defineProps<{
  type?: 'outside' | 'local'
  to: string
}>()

const line = ref<HTMLDivElement | null>(null)
const arrow = ref<SVGElement | null>(null)
const timeline = gsap.timeline({ paused: true })

function onEnter() {
  timeline.play()
}

function onLeave() {
  timeline.reverse()
}

onMounted(() => {
  nextTick()
  timeline.add(gsap.to(line.value, {
    ease: 'power3',
    duration: 0.4,
    width: '100%',
  }))
  timeline.add(gsap.to(arrow.value, {
    ease: 'power2',
    duration: 0.4,
    scale: '1',
  }), '=-0.2')
})
</script>

<template>
  <div @mouseenter="onEnter" @mouseleave="onLeave">
    <a v-if="props.type === 'outside'" :href="to" target="_blank" rel="noopener noreferrer" class="link">
      <div class="link--container">
        <slot />
        <svg ref="arrow" class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M6 7c0 .55.45 1 1 1h7.59l-8.88 8.88a.996.996 0 1 0 1.41 1.41L16 9.41V17c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1z" />
        </svg>
      </div>
      <div ref="line" class="line" />
    </a>
    <RouterLink v-else :to="props.to" class="link">
      <div class="link--container">
        <slot />
        <svg ref="arrow" class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M6 7c0 .55.45 1 1 1h7.59l-8.88 8.88a.996.996 0 1 0 1.41 1.41L16 9.41V17c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1z" />
        </svg>
      </div>
      <div ref="line" class="line" />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.link {
  display: block;

  .link--container {
    display: flex;
    align-items: center;
    padding: $default-unit;

    .arrow {
      transform-origin: bottom left;
      width: calc(100vw/2560*30);
      scale: 0;
    }
  }
}

.line {
  height: 1px;
  width: 0px;
  border-radius: 100%;
  background-color: rgb(var(--primary));
}
</style>
