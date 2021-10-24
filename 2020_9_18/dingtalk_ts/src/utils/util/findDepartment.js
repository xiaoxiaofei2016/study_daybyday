import { BLUE_STORE } from '@/config'

// 根据分割字符串寻找首位和末位
export function findDepartment (str, line) {
  const hasLine = str.indexOf(line) > -1
  if (hasLine) {
    const arr = str.split(line)
    const first = arr[0]
    const last = arr[arr.length - 1]
    if (first === last) {
      return first
    } else {
      return `${first}-${last}`
    }
  } else {
    return str
  }
}

// 判断是否是门店
export function isBlueStore (str, line) {
  const hasLine = str.indexOf(line) > -1
  if (!hasLine) return false
  const arr = str.split(line)
  const newArr = []
  BLUE_STORE.forEach(item => {
    const isBlue = arr.some(a => a === item.department)
    if (isBlue) newArr.push(isBlue)
  })
  if (newArr.length) return true
  return false
}

// 深度遍历获取  部门ids
// tree 部门树 id 目标部门id
export function getDeptIds (tree, id) {
  const ids = []
  const deepMap = (depts) => {
    for (const item of depts) {
      const isChildren = new RegExp(`/${id}/`).test(item.parent_path)
      if (+item.id === +id || isChildren) {
        item.id && ids.push(item.id)
      }
      if (item.children) deepMap(item.children)
      if (+item.id === +id) return
    }
  }
  deepMap(tree)
  return ids
}

// 去除数组中id重复的项
export function filterArray (arr, key) {
  if (!(arr instanceof Array)) return
  const newArr = []
  arr.forEach(item => {
    if (!item[key]) return
    const isSame = newArr.some(i => i[key] === item[key])
    if (!isSame) {
      newArr.push(item)
    }
  })
  return newArr
}
