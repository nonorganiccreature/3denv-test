<script setup lang="ts">
import { inject, onMounted, useTemplateRef } from 'vue';
import type { GameApplication } from '../../assets/game';

const gameApplication = inject<GameApplication>('gameApplication')
const canvasRef = useTemplateRef('gameCanvas')

onMounted(() => {
  if (gameApplication && canvasRef.value) {
    gameApplication.initializeApplication(canvasRef.value)
  }
})

</script>

<template>
    <canvas ref="gameCanvas" id="game_canvas"></canvas>
</template>

<style scoped></style>
