<script setup lang="ts">
</script>

<template>
  <div class="hud">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.hud {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;

  display: flex;
}
</style>
