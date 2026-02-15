// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    SecretId: process.env.SECRET_ID,
    SecretKey: process.env.SECRET_KEY,
    public: {
      // 公开
      api: '',
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  vite: {
    plugins: [],
  },

  modules: [
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
})
