<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useCollectionsStore } from '@/stores/collections'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import type { ICollection } from '@/types/collection'

const props = defineProps<{
  focus: boolean
}>()
const emit = defineEmits(['close'])
const store = useCollectionsStore()
const name = ref<string>('')
const input = ref<InstanceType<typeof Input>>()

function onSubmit() {
  const collection: ICollection = {
    id: crypto.randomUUID(),
    name: name.value,
    created: new Date(),
  }

  store.createCollection(collection)
  emit('close')
}

onMounted(() => {
  if (props.focus === true) {
    nextTick()
    input.value?.focus()
  }
})
</script>

<template>
  <div class="collection--create">
    <h4>Create</h4>
    <form class="collection--form" @submit.prevent="onSubmit">
      <Input ref="input" v-model.trim="name" type="text" placeholder="Collection name" required />
      <div class="button--container">
        <Button type="accept">
          Accept
        </Button>
        <Button type="cancel" @click.prevent="emit('close')">
          Cancel
        </Button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.collection--create {
  display: flex;
  flex-direction: column;
  gap: $default-unit * 4;

  .collection--form {
    display: flex;
    flex-direction: column;
    gap: $default-unit*4;

    .button--container {
      width: 100%;
      display: flex;
      gap: $default-unit*4;
    }
  }
}
</style>
