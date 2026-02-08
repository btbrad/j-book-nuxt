import Joi from 'joi'
import { genTitle } from '~~/server/utils/helper'

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
    notebookId: Joi.number().required(),
  })

  try {
    const value = await schema.validateAsync(body)
  } catch (err) {
    return responseJson(1, '参数错误')
  }

  const con = getDB()

  try {
    /**
     * 修改文章
     */
    const [rows] = await (con as any).execute(
      'INSERT INTO notes (title, content_md, state, uid) VALUE (?, ?, ?, ?)',
      [genTitle(), '', 1, uid],
    )
    if (rows.affectedRows === 0) {
      return responseJson(1, '创建失败')
    }
    // 关联文集表
    const [rows2] = await (con as any).execute(
      'INSERT INTO notebook_notes (notebook_id, note_id) VALUE (?, ?)',
      [body.notebookId, rows.insertId],
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
