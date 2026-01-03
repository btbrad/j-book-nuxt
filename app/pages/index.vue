import { NuxtLink } from '../../.nuxt/components';
<template>
  <div>
    index页面
  </div>
  <HelloWorld />
  <NuxtLink to="/about">跳转about</NuxtLink>
  <NuxtLink to="/users-admin/3">跳转user</NuxtLink>
  <a-button @click="toAbout">跳转about</a-button>
  <a-button @click="toUser">跳转user</a-button>
</template>

<script setup lang="ts">
const router = useRouter()

const toAbout = () => {
  router.push({
    path: 'about'
  })
}

const toUser = () => {
  router.push({
    path: 'users-admin/3'
  })
}
</script>

<style scoped>

</style>