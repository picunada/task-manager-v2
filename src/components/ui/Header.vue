<script setup lang="ts">
import Link from '@/components/ui/Link.vue'
</script>

<template>
  <header>
    <div class="header-container">
      <Link to="/">
      <h3 class="header--logo">
        Tasker
      </h3>
      </Link>
      <nav class="header--navigation">
        <div class="link--container">
          <Link to="/tasks">
          <h5>
            Tasks
          </h5>
          </Link>
          <Link to="/about">
          <h5>
            About
          </h5>
          </Link>
          <Link to="/project">
          <h5>
            Project
          </h5>
          </Link>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header--logo {
    text-transform: uppercase;
  }

  .header--navigation {
    text-transform: uppercase;

    .link--container {
      display: flex;
      gap: $default-unit * 2;
      overflow: hidden;
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
