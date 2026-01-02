<template>
  <div class="current-time">
    <div class="time">{{ formattedTime }}</div>
    <div class="date">{{ formattedDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})

const formattedDate = computed(() => {
  return currentTime.value.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.current-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  font-family: 'Courier New', monospace;
}

.time {
  font-size: 48px;
  font-weight: bold;
  color: #333;
}

.date {
  font-size: 18px;
  color: #666;
}
</style>
