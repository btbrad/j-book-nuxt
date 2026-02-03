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
  <h1>{{ $myPlugin('World') }}</h1>
  <a-button type="primary" @click="info">message插件</a-button>
  <h1>count: {{ myStore.count }}</h1>
  <a-button @click="handleAdd">+1</a-button>
</template>

<script setup lang="ts">
import { useMystore } from '~/store/myStore'

const myStore = useMystore()

const { $message } = useNuxtApp()
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

const info = () => {
  $message.info('hello')
}

const handleAdd = () => {
  myStore.increment()
}

</script>

<style scoped>

</style>