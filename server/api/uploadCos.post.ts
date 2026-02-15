import path from 'path'
import fs from 'fs'
import COS from 'cos-nodejs-sdk-v5'

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

    const config = useRuntimeConfig()

    const cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
    })

    const filename = Date.now() + '-' + body[0].filename
    const buffer = body[0].data

    // 请求文件
    const data = await cos.putObject({
      Bucket: 'book-1404857510',
      Region: 'ap-nanjing',
      Key: filename,
      Body: buffer,
      ContentType: body[0].type,
      ContentDisposition: 'inline', // 必须使用自定义域名才能在浏览器预览，妈的！
    })

    const avatarUrl = `https://${data.Location}`

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
      console.log('error', error)
      ;(con as any).end()
      setResponseStatus(event, 500)
      return responseJson(1, '服务器错误')
    }
  }
  return responseJson(1, '请上传头像')
})
