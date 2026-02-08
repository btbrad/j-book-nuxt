import Joi from 'joi'

export default defineEventHandler(async (event) => {
  // 检查是否登录
  const uid = getLoginUid(event)
  if (!uid) {
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录')
  }

  const con = getDB()

  try {
    /**
     * 获取用户的文集
     */
    const [rows2] = await (con as any).execute(
      'SELECT * FROM notebooks WHERE uid = ?',
      [uid],
    )

    // 释放连接
    ;(con as any).end()
    if (rows2.length > 0) {
      return responseJson(0, '获取成功', rows2)
    } else {
      return responseJson(1, '获取失败')
    }
  } catch (error) {
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
