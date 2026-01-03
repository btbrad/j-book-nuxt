<template>
  <div>
    user-{{ route.params.group }}--{{ route.params.id }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>

</style>