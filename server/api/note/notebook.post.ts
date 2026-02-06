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
    name: Joi.string().required(),
  })

  try {
    const value = await schema.validateAsync(body)
  } catch (err) {
    return responseJson(1, '参数错误')
  }

  const con = getDB()

  try {
    /**
     * 插入数据
     */
    const [rows2] = await (con as any).execute(
      'Insert into notebooks (name, uid) values (?, ?)',
      [body.name, uid],
    )

    // 释放连接
    ;(con as any).end()
    if (rows2.affectedRows === 1) {
      return responseJson(0, '创建成功')
    } else {
      return responseJson(1, '创建失败')
    }
  } catch (error) {
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
