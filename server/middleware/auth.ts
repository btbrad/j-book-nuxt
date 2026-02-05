import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  let token = getHeader(event, 'Authorization')
  if (token) {
    token = token.replace('Bearer ', '')
    const secret = 'j-book-nuxt'
    try {
      const decoded = jwt.verify(token, secret)
      // 类型检查：确保 decoded 是 JwtPayload 类型
      if (typeof decoded !== 'string' && decoded.data?.uid) {
        event.context.auth = { uid: decoded.data.uid }
      }
    } catch (error) {
      console.log('jwt解码错误', error)
    }
  }
})
