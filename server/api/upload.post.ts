import path from 'path'
import fs from 'fs'
import { genTitle } from '~~/server/utils/helper'

export default defineEventHandler(async (event) => {
  // 检查是否登录
  const uid = getLoginUid(event)
  if (!uid) {
    setResponseStatus(event, 401)
    return responseJson(1, '请先登录')
  }

  // 获取请求参数
  const body = await readMultipartFormData(event)

  console.log(body)

  if (body) {
    if (
      body[0].type !== 'image/jpeg' &&
      body[0].type !== 'image/png' &&
      body[0].type !== 'image/jpg'
    ) {
      return responseJson(1, '请上传jepg/png/jpg类型的图片')
    }
    const filename = Date.now() + '-' + body[0].filename
    const filePath = path.join('./public', 'img', filename)
    const buffer = body[0].data
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.log(err)
      }
    })

    const avatarUrl = '/img/' + filename

    const con = getDB()

    try {
      /**
       * 插入头像
       */
      const [rows] = await (con as any).execute(
        'UPDATE users SET avatar = ? WHERE id = ?',
        [avatarUrl, uid],
      )
      // 释放连接
      ;(con as any).end()
      if (rows.affectedRows === 0) {
        return responseJson(1, '上传头像失败')
      }
      return responseJson(0, '上传头像成功', {
        avatar: avatarUrl,
      })
    } catch (error) {
      ;(con as any).end()
      setResponseStatus(event, 500)
      return responseJson(1, '服务器错误')
    }
  }
  return responseJson(1, '请上传头像')
})
