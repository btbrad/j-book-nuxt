export default defineEventHandler(async (event) => {
  // 获取数据
  const params = getQuery(event)

  const con = getDB()

  try {
    /**
     * 获取用户的文章
     */
    const [rows2] = await (con as any).execute(
      'SELECT * FROM notes LIMIT ? OFFSET ?',
      [
        Number(params.pageSize),
        (Number(params.page) - 1) * Number(params.pageSize),
      ],
    )

    // 释放连接
    ;(con as any).end()
    if (rows2.length > 0) {
      return responseJson(0, '获取成功', { list: rows2 })
    } else {
      return responseJson(1, '获取失败')
    }
  } catch (error) {
    ;(con as any).end()
    setResponseStatus(event, 500)
    return responseJson(1, '服务器错误')
  }
})
