import Joi from 'joi'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  /**
   * 获取请求参数
   */
  const body = await readBody(event)
  console.log(111, body)

  /**
   * 参数验证
   */
  const schema = Joi.object({
    phone: Joi.string()
      .pattern(/^1[3456789]\d{9}$/)
      .required(),
    password: Joi.string().required(),
  })

  try {
    const value = await schema.validateAsync(body)
  } catch (err) {
    return responseJson(1, '参数错误')
  }

  /**
   * 密码加密
   */
  const salt = 'j-book-nuxt'
  const password = md5(md5(body.password) + salt)

  const con = getDB()

  try {
    /**
     * 验证手机号是否已注册
     */
    const [rows] = await (con as any).execute(
      'Select * from users where phone = ? and password = ?',
      [body.phone, password],
    )

    if (!rows.length) {
      return responseJson(1, '账号或密码错误')
    }
    // 释放连接
    ;(con as any).end()
    // 生成token
    const secret = 'j-book-nuxt'
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { data: { uid: rows[0].id } },
      },
      secret,
    )
    return responseJson(0, '登录成功', {
      accessToken: token,
      userInfo: {
        nickname: rows[0].nickname,
        phone: rows[0].phone,
        id: rows[0].id,
      },
    })
  } catch (error) {
    ;(con as any).end()
    return responseJson(1, '服务器错误')
  }
})
