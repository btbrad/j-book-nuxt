<template>
  <div>
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    default: 'Hello World'
  }
})
</script>

<style scoped>

</style>