<script setup lang="ts">
const props = defineProps<{
  type?: 'accept' | 'cancel'
}>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
  customOptions: {},
}
</script>

<template>
  <button class="button" :class="props.type" v-bind="$attrs">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  width: 100%;
  padding: $default-unit*2 $default-unit*4;
  border-radius: $default-unit*2;
  // border: 1px solid rgb(var(--primary));
  background-color: rgb(10, 10, 10);
  outline: 1px solid transparent;
  font-weight: 500;
  transition: 0.3s ease;
  transition-property: outline-color, box-shadow, background-color;

  &.accept {
    &:hover {
      outline-color: rgb(var(--accept))
    }
  }

  &.cancel {
    &:hover {
      outline-color: rgb(var(--cancel))
    }
  }

  &:hover {
    background-color: rgb(15, 15, 15);
    outline-color: rgb(var(--primary));
    box-shadow: 0 5px 20px rgba($color: var(--primary), $alpha: .1);
  }

  &:focus {
    outline-color: rgb(var(--primary));
    box-shadow: 0 5px 20px rgba($color: var(--primary), $alpha: .1);
  }
}
</style>
