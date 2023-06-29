<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()
const emit = defineEmits(['update:modelValue'])
const input = ref<HTMLInputElement | null>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function focus() {
  nextTick(() => {
    if (input.value)
      input.value.focus()
  })
}

defineExpose({
  focus,
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
  customOptions: {},
}
</script>

<template>
  <input ref="input" v-model="value" class="input" v-bind="$attrs">
</template>

<style lang="scss" scoped>
.input {
  background-color: rgb(10, 10, 10);
  padding: $default-unit*2;
  outline: 1px solid transparent;
  border-radius: $default-unit*2;
  transition: 0.3s ease;
  transition-property: outline-color, box-shadow, background-color;

  &:focus {
    outline-color: rgb(var(--primary));
    box-shadow: 0 5px 30px rgba(var(--primary), .1);
  }

  &:required:focus:valid {
    outline-color: rgb(var(--accept));
    box-shadow: 0 5px 30px rgba(var(--accept), .2);
  }

  &:invalid:focus {
    outline-color: rgb(var(--cancel));
    box-shadow: 0 5px 30px rgba(var(--cancel), .2);
  }
}
</style>
