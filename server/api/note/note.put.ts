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
    noteId: Joi.number().required(),
    title: Joi.string().required(),
    content_md: Joi.string().required(),
    state: Joi.number().required(),
  })

  try {
    const value = await schema.validateAsync(body)
  } catch (err) {
    console.log('222', err)
    return responseJson(1, '参数错误')
  }

  const con = getDB()

  try {
    /**
     * 修改文章
     */
    const [rows] = await (con as any).execute(
      'UPDATE notes SET title=?, content_md=?, state=? WHERE id = ? AND uid = ?',
      [body.title, body.content_md, body.state, body.noteId, uid],
    )

    // 释放连接
    ;(con as any).end()
    if (rows.affectedRows === 1) {
      return responseJson(0, '修改成功')
    } else {
      return responseJson(1, '修改失败')
    }
  } catch (error) {
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
