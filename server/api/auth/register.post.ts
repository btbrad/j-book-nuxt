import Joi from 'joi'
import md5 from 'md5'
import { responseJson } from '~~/server/utils/helper'

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
    nickname: Joi.string().required(),
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

  try {
    /**
     * 验证手机号是否已注册
     */
    const [rows] = await (getDB() as any).execute(
      'Select * from users where phone = ?',
      [body.phone],
    )

    if (rows.length) {
      return responseJson(1, '手机号已注册')
    }

    const [rows2] = await (getDB() as any).execute(
      'Insert into users (nickname, phone, password) values (?, ?, ?)',
      [body.nickname, body.phone, password],
    )
    console.log('row2', rows2)
    if (rows2.affectedRows === 1) {
      return responseJson(0, '注册成功')
    }
  } catch (error) {
    return responseJson(1, '服务器错误')
  }

  return {}
})
