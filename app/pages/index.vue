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
  <h1>useState counter: {{ counter }}</h1>
  <a-button @click="handleAddCounter">+1</a-button>
</template>

<script setup lang="ts">
import { useMystore } from '~/store/myStore'

// const counter = useState('counter', () => 0)
// counter.value = 10

const counter = useCounter()
const handleAddCounter = () => {
  counter.value++
}

const userInfoCookie = useCookie<Record<string, any>>('userInfo', { maxAge: 60 * 60 * 24 * 7 })
userInfoCookie.value = {
  name: 'j-book',
  age: 18
}

// const { data, pending, error } = useFetch('https://api.nuxtjs.dev/mountains', {
//   server: false
// })

const { data, pending, error } = useFetch('/user', {
  server: false
})

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