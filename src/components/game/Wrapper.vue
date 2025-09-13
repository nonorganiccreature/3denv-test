<script setup lang="ts">
import HUD from './HUD.vue';
import Renderer from './Renderer.vue';
</script>

<template>
  <HUD class="game-hud">
    <Renderer />
  </HUD>
</template>

<style scoped lang="scss">
.game-hud {
  width: 100%;

  display: flex;
  flex-flow: column nowrap;
}
</style>
