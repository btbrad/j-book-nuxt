import Joi from 'joi'

export default defineEventHandler(async (event) => {
  // 检查是否登录
  const uid = getLoginUid(event)
  if (!uid) {
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录')
  }

  // 获取数据
  const params = getQuery(event)

  /**
   * 参数验证
   */
  const schema = Joi.object({
    noteId: Joi.number().required(),
  })

  try {
    const value = await schema.validateAsync(params)
  } catch (err) {
    return responseJson(1, '参数错误')
  }

  const con = getDB()

  try {
    /**
     * 获取用户的文章
     */
    const [rows2] = await (con as any).execute(
      'SELECT * FROM notes WHERE uid = ? AND id = ?',
      [
        uid,
        params.noteId,
      ],
    )

    // 释放连接
    ;(con as any).end()
    if (rows2.length > 0) {
      return responseJson(0, '获取成功', { ...rows2[0] })
    } else {
      return responseJson(1, '获取失败')
    }
  } catch (error) {
    console.log('error', error)
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
