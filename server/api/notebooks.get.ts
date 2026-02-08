export default defineEventHandler(async (event) => {
  // 获取请求参数
  const con = getDB()

  try {
    /**
     * 获取所有文集
     */
    const [rows2] = await (con as any).execute('SELECT * from notebooks')

    // 释放连接
    ;(con as any).end()
    return responseJson(0, '获取成功', rows2)
  } catch (error) {
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
