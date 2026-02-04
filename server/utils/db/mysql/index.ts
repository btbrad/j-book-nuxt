import mysql from 'mysql2'

export const getDB = () => {
  return mysql
    .createPool({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'jbook',
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10, // 最大空闲连接数，默认等于 `connectionLimit`
      idleTimeout: 60000, // 空闲连接超时，以毫秒为单位，默认值为 60000 ms
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
    .promise()
}
