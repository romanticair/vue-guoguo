/**
 * 解析URL参数
 * @example ?id=12345&key=val
 * @return Object {id:12345, a:b}
 */

export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let itemArr = item.substring(1).split('=')
      let key = decodeURIComponent(itemArr[0])
      let val = decodeURIComponent(itemArr[1])
      obj[key] = val
    })
  }
  return obj
}
