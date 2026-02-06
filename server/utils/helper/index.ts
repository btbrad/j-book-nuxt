import { H3Event } from 'h3'

export const responseJson = (code: number, msg: string, data = {}) => {
  return { code, msg, data }
}

export const getLoginUid = (event: H3Event) => {
  return event.context.auth ? event.context.auth.uid : 0
}
