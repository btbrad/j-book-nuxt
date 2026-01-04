export default defineNuxtRouteMiddleware((to, from) => {
  let user = true
  if (!user) {
    return navigateTo('/login')
  }
})
