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
    notebookId: Joi.number().required(),
  })

  try {
    const value = await schema.validateAsync(params)
  } catch (err) {
    return responseJson(1, '参数错误')
  }

  const con = getDB()

  try {
    /**
     * 查询文章文集关联表
     */
    const [notebookRows] = await (con as any).execute(
      'SELECT note_id FROM notebook_notes WHERE notebook_id = ?',
      [params.notebookId],
    )

    // 查询文章
    const noteIdList = notebookRows.map((item: any) => item.note_id)

    if (noteIdList.length === 0) {
      ;(con as any).end()
      return responseJson(0, '获取成功', { list: [] })
    }

    const placeholders = noteIdList.map(() => '?').join(',')
    const [noteRows] = await (con as any).execute(
      `SELECT * FROM notes WHERE uid=? AND id IN (${placeholders})`,
      [uid, ...noteIdList],
    )

    // 释放连接
    ;(con as any).end()
    return responseJson(0, '获取成功', { list: noteRows })
  } catch (error) {
    console.log('error', error)
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
