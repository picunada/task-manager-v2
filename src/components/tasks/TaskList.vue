<script setup lang="ts">
import type { ICollection } from '@type/collection'
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import Task from './Task.vue'
import StatusBadge from './StatusBadge.vue'
import StatusWrapper from './StatusWrapper.vue'
import { Status } from '@/types/enum/status'
import { useTasksStore } from '@/stores/tasks'

const props = defineProps<{
  collection?: ICollection
}>()

const showDropIndicator = ref(false)

// pinia store
const taskStore = useTasksStore()

function onDrop(e: DragEvent, status: Status) {
  const taskID = e.dataTransfer!.getData('itemID')
  const task = taskStore.tasks.find(t => t.id === taskID)
  task!.status = status
}

function onDragEnter() {
  showDropIndicator.value = true
}

function onDragLeave() {
  showDropIndicator.value = false
}
</script>

<template>
  <div v-if="props.collection" class="tasks--container">
    <div class="collection-name">
      <h4>{{ props.collection.name }}</h4>
      <p class="collection-tag">
        collection
      </p>
    </div>
    <div class="status--grid">
      <StatusWrapper :status="Status['not-started']">
        <template #badge>
          <StatusBadge type="not-started">
            Not Started
          </StatusBadge>
        </template>
        <template #tasks>
          <TransitionGroup name="list" appear>
            <Task
              v-for="task in taskStore.tasks.filter(t => t.collection === props.collection?.id && t.status === Status['not-started'])"
              :key="task.id" :task="task" />
          </TransitionGroup>
        </template>
        <template #button>
          <Button class="task--create" @click="taskStore.createTask(props.collection, Status['not-started'])">
            <div class="container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z" />
              </svg>
              New
            </div>
          </Button>
        </template>
      </StatusWrapper>
      <StatusWrapper :status="Status['in-progress']">
        <template #badge>
          <StatusBadge type="in-progress">
            In Progress
          </StatusBadge>
        </template>
        <template #tasks>
          <TransitionGroup name="list" appear>
            <Task
              v-for="task in taskStore.tasks.filter(t => t.collection === props.collection?.id && t.status === Status['in-progress'])"
              :key="task.id" :task="task" />
          </TransitionGroup>
        </template>
        <template #button>
          <Button class="task--create" @click="taskStore.createTask(props.collection, Status['in-progress'])">
            <div class="container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z" />
              </svg>
              New
            </div>
          </Button>
        </template>
      </StatusWrapper>
      <StatusWrapper :status="Status.done">
        <template #badge>
          <StatusBadge type="done">
            Done
          </StatusBadge>
        </template>
        <template #tasks>
          <TransitionGroup name="list" appear>
            <Task
              v-for="task in taskStore.tasks.filter(t => t.collection === props.collection?.id && t.status === Status.done)"
              :key="task.id" :task="task" />
          </TransitionGroup>
        </template>
      </StatusWrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tasks--container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: $default-unit*4;
  gap: $default-unit*4;
  // background-color: rgb(var(--secondary-background));
  border-radius: $default-unit*2;

  .collection-name {
    display: flex;
    align-items: center;
    gap: $default-unit*2;

    p {
      color: rgb(var(--secondary));
    }
  }

  .collection-tag {
    font-size: calc(100vw/2560 * 20);
  }

  .status--grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $default-unit*4;

    .task--create {
      background-color: transparent;
      transition: background-color 0.3s ease;
      text-align: left;

      &:hover {
        background-color: rgba(10, 10, 10);
        outline: none;
        box-shadow: none;
      }

      &:focus {
        box-shadow: none;
      }

      .container {
        display: flex;
        align-items: center;
        gap: $default-unit;
      }
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: $default-unit;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  opacity: 0;
}
</style>
