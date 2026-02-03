import { message } from 'ant-design-vue'

export default defineNuxtPlugin(() => {
  return { provide: { message } }
})
