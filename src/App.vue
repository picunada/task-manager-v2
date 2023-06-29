<script setup lang="ts">
import Header from '@/components/ui/Header.vue'
</script>

<template>
  <Header />

  <main>
    <RouterView v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

main {
  flex: 1;
  display: flex;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.page {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.7s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
