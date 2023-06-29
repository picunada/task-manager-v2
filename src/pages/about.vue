<script setup lang="ts">
import Link from '@/components/ui/Link.vue'
</script>

<template>
  <div class="wrapper">
    <h1>
      Hello i'm Picunada
    </h1>
    <h2>
      a Modern Web Developer
      focused on UI Design, 3D and UX.
    </h2>
    <Link type="outside" to="https://picunada.netlify.app">
    <h5>
      my portfolio
    </h5>
    </Link>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
