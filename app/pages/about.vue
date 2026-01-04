<template>
  <div>
    <h1>about页面</h1>
    <CurrentTime />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  // 具名路由中间件
  // middleware: 'auth',
  // 匿名路由中间件
  middleware: defineNuxtRouteMiddleware((to, from) => {
    let user = false
    if (!user) {
      return navigateTo('/login')
    }
  })
})
</script>

<style scoped>

</style>