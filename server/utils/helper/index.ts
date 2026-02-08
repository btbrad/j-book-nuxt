import { H3Event } from 'h3'
import dayjs from 'dayjs'

export const responseJson = (code: number, msg: string, data = {}) => {
  return { code, msg, data }
}

export const getLoginUid = (event: H3Event) => {
  return event.context.auth ? event.context.auth.uid : 0
}

export const genTitle = () => {
  return dayjs().format('YYYY-MM-DD')
}
