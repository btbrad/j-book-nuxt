import Joi from 'joi'

export default defineEventHandler(async (event) => {
  // 检查是否登录
  const uid = getLoginUid(event)
  if (!uid) {
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录')
  }

  // 获取请求参数
  const body = await readBody(event)

  /**
   * 参数验证
   */
  const schema = Joi.object({
    id: Joi.number().required(),
  })

  try {
    const value = await schema.validateAsync(body)
  } catch (err) {
    return responseJson(1, '参数错误')
  }

  const con = getDB()

  try {
    /**
     * 删除文集
     */
    const [rows2] = await (con as any).execute(
      'DELETE FROM notebooks WHERE id = ? AND uid = ?',
      [body.id, uid],
    )

    // 释放连接
    ;(con as any).end()
    if (rows2.affectedRows === 1) {
      return responseJson(0, '删除成功')
    } else {
      return responseJson(1, '删除失败')
    }
  } catch (error) {
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
