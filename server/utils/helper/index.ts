export const responseJson = (code: number, msg: string, data = {}) => {
  return { code, msg, data }
}
