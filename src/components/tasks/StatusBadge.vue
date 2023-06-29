<script setup lang="ts">
import { gsap } from 'gsap'
import { nextTick, onMounted, ref } from 'vue'

const props = defineProps<{
  type?: 'not-started' | 'in-progress' | 'done'
}>()
const timeline = gsap.timeline({ paused: true })
const badge = ref<HTMLDivElement | null>(null)
const dot = ref<HTMLDivElement | null>(null)

function onEnter() {
  timeline.play().then(() => timeline.pause(0))
}

onMounted(() => {
  nextTick()
  timeline.add(gsap.to(dot.value, {
    duration: 0.3,
    ease: 'power3',
    scale: 1.3,
  }))
  timeline.add(gsap.to(dot.value, {
    duration: 0.3,
    ease: 'power3',
    scale: 1,
  }))
})
</script>

<template>
  <div ref="badge" class="badge prevent-select" :class="props.type" @mouseenter="onEnter()">
    <div class="badge--container">
      <div ref="dot" class="dot" />
      <p class="badge-name">
        <slot />
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  width: fit-content;
  padding: $default-unit $default-unit*2;
  border-radius: $default-unit*4;

  .badge--container {
    display: flex;
    align-items: center;
    gap: $default-unit;

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 100%;
    }

    .badge-name {
      font-size: calc(100vw/2560 * 20);
      line-height: 1;
      color: rgba(var(--primary), 0.5);
    }
  }

  &.not-started {
    background-color: rgba($color: #5a5a5a, $alpha: .8);

    .dot {
      background-color: #707070;
    }
  }

  &.in-progress {
    background-color: rgba($color: #a5ff7e, $alpha: .3);

    .dot {
      background-color: #a5ff7e;
    }
  }

  &.done {
    background-color: rgba($color: #7e61ff, $alpha: .3);

    .dot {
      background-color: #7e61ff;
    }
  }
}
</style>
