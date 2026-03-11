import { callWithNuxt } from '#app'

interface FetchOptions {
  headers?: Record<string, string>
  [key: string]: any
}

export const useHttpFetch = (url: string, opt: FetchOptions) => {
  // token
  const token = useCookie('accessToken')
  const headers = {
    ...opt.headers,
    Authorization: token.value ? `Bearer ${token.value}` : '',
  }
  opt.headers = headers
  const nuxtApp = useNuxtApp()
  return useFetch(url, {
    ...opt,
    baseURL: 'http://localhost:3000',
    onRequest({ request, options }) {
      // Set the request headers
      // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
      console.log('request', request)
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log('request', request)
    },
    onResponse({ request, response, options }) {
      // Process the response data
      // console.log('response', response)
    },
    async onResponseError({ request, response, options }) {
      // Handle the response errors
      if (response.status === 401) {
        token.value = ''
        await callWithNuxt(nuxtApp, navigateTo, [
          '/sign_in',
          { replace: true, redirectCode: 401 },
        ])
      } else if (response.status === 500) {
        console.log('服务器错误')
      }
    },
  })
}

// 注册接口
export const registerFetch = (opt: FetchOptions) => {
  return useHttpFetch('/api/auth/register', opt)
}

// 登录接口
export const loginFetch = (opt: FetchOptions) => {
  return useHttpFetch('/api/auth/login', opt)
}

// 文集接口
export const notebookFetch = (opt: FetchOptions) => {
  return useHttpFetch('/api/note/notebook', opt)
}

// 获取文章接口
export const notesFetch = (opt: FetchOptions) => {
  return useHttpFetch('/api/note/notes', opt)
}

export const noteFetch = (opt: FetchOptions) => {
  return useHttpFetch('/api/note/note', opt)
}

// 获取文章列表
export const homeNotesFetch = (opt: FetchOptions) => {
  return useHttpFetch('/api/notes', opt)
}
