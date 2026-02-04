interface FetchOptions {
  headers?: Record<string, string>
  [key: string]: any
}

export const useHttpFetch = (url: string, opt: FetchOptions) => {
  // token
  const token = useCookie('token')
  const headers = {
    ...opt.headers,
    Authorization: token.value ? `Bearer ${token.value}` : '',
  }
  opt.headers = headers
  return useFetch(url, {
    ...opt,
    baseURL: '',
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
      console.log('response', response)
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log('response', response)
    },
  })
}
