/*
 * @Company: 智联招聘
 * @Author: xuebin.me
 * @LastEditors: Leo
 * @version: 0.0.0
 * @Description: https://sourcegraph.com/github.com/nuysoft/Mock@refactoring/-/blob/src/mock/random/basic.js
 */

// eslint-disable-next-line
const throwIfMiss = param => {
  throw new Error(` ${param} 参数缺失 `)
}

/**
 * 保留n位小数
 * @param {*} value
 * @param {*} n
 */
const roundFun = (value, n) => {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
}

// #region 返回一个随机的自然数（大于等于 0 的整数）
/**
 * 返回一个随机的自然数（大于等于 0 的整数）
 *
 * @export
 * @param {*} min 默认：0
 * @param {*} max 默认：9007199254740992 （2^53）
 * @returns
 */
export function natural(min = 0, max = 9007199254740992) {
  return Math.round(Math.random() * (max - min)) + min
}
// #endregion

// #region 返回一个随机的整数。
/**
 * 返回一个随机的整数。
 *
 * @export
 * @param {*} min 默认：-9007199254740992
 * @param {*} max 默认：9007199254740992（2^53）
 * @returns
 */
export function integer(min = -9007199254740992, max = 9007199254740992) {
  return Math.round(Math.random() * (max - min)) + min
}
// #endregion

// #region 返回一个随机的浮点数。
/**
 * 返回一个随机的浮点数。
 *
 * @export
 * @param {*} min
 * @param {*} max
 * @param {*} dmin
 * @param {*} dmax
 * @returns
 */
export function float(min, max, dmin = 0, dmax = 17) {
  let ret = `${integer(min, max)}.`
  for (
    let i = 0, dcount = natural(Math.max(Math.min(dmin, 17), 0), Math.max(Math.min(dmax, 17), 0));
    i < dcount;
    i++
  ) {
    ret +=
      // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
      i < dcount - 1 ? character('number') : character('123456789')
  }
  return parseFloat(ret, 10)
}
// #endregion

// #region 返回一个随机字符。
/**
 * 返回一个随机字符。
 *
 * @export
 * @param {*} pool
 * @returns
 */
export function character(pool) {
  const pools = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number: '0123456789',
    symbol: '!@#$%^&*()[]'
  }
  pools.alpha = pools.lower + pools.upper
  pools.undefined = pools.lower + pools.upper + pools.number + pools.symbol

  const newPool = pools[`${pool}`.toLowerCase()] || pool
  return newPool.charAt(natural(0, newPool.length - 1))
}
// #endregion

// #region 返回一个随机字符串。
/**
 * 返回一个随机字符串。
 * 或从npm下载[chinese-random-ip](https://github.com/taliu/chinese-random-ip)
 *
 * @export
 * @param {*} pool
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function string(pool, min, max) {
  let len
  switch (arguments.length) {
    case 0: // ()
      len = natural(3, 7)
      break
    case 1: // ( length )
      len = pool
      pool = undefined // eslint-disable-line
      break
    case 2:
      // ( pool, length )
      // eslint-disable-next-line
      if (typeof arguments[0] === 'string') {
        len = min
      } else {
        // ( min, max )
        len = natural(pool, min)
        pool = undefined // eslint-disable-line
      }
      break
    case 3:
      len = natural(min, max)
      break
    default:
      len = natural(3, 7)
  }

  let text = ''
  for (let i = 0; i < len; i++) {
    text += character(pool)
  }

  return text
}
// #endregion

// #region 返回一个整型数组。
/**
 * 返回一个整型数组。
 *
 * @export
 * @param {*} start
 * @param {*} stop
 * @param {*} step
 * @returns
 */
export function range(start, stop, step) {
  // range( stop )
  if (arguments.length <= 1) {
    stop = start || 0 // eslint-disable-line
    start = 0 // eslint-disable-line
  }
  // range( start, stop )
  step = arguments[2] || 1 // eslint-disable-line

  start = +start // eslint-disable-line
  stop = +stop // eslint-disable-line
  step = +step // eslint-disable-line

  const len = Math.max(Math.ceil((stop - start) / step), 0)
  let idx = 0
  const rangeArr = new Array(len)

  while (idx < len) {
    rangeArr[idx++] = start
    start += step // eslint-disable-line
  }

  return rangeArr
}
// #endregion

// #region 获取随机IP
/**
 * 获取随机IP
 *
 * @export
 * @returns
 */
export function ip() {
  return `${natural(0, 255)}.${natural(0, 255)}.${natural(0, 255)}.${natural(0, 255)}`
}
// #endregion

// #region 指定范围内随机经纬度坐标
/** 指定范围内随机经纬度坐标
 * base_log：经度基准点，
 * base_lat：维度基准点，
 * radius：距离基准点的半径
 */
export function gps(base_log, base_lat, radius) {
  let radius_in_degrees = radius / 111300
  let u = Math.random(0, 1)
  let v = Math.random(0, 1)
  let w = radius_in_degrees * Math.sqrt(u)
  let t = 2 * Math.PI * v
  let x = w * Math.cos(t)
  let y = w * Math.sin(t)
  let longitude = y + base_log
  let latitude = x + base_lat
  let loga = roundFun(longitude, 6)
  let lata = roundFun(latitude, 6)
  return [loga, lata]
}
// #endregion
