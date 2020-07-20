// 原始类型
let bool: boolean = true
let num: number = 123
let str: string = 'abc'
// str = 123 // error

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
let arr3: Array<number | string> = [1, 2, '3']

// 元祖
let tuple: [number, string] = [0, '1']

// 函数
let add = (x: number, y: number) => x + y
let compute: (x: number, y: number) => number
compute = (a, b) => a + b

// 对象
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 3

// symbol
let s1: symbol = Symbol()
let s2 = Symbol()
s1 === s2 // false

// undefined, null
let un: undefined = undefined
let nu: null = null
num = undefined // 需将strictNullChecks设置为false 或者设置let num: number ｜ undefined ｜ null = 123
num = null

// void
let noReturn = () => {}

// any
let x: any = 1
x = ['3']

// never
let error = () => {
  throw new Error('error')
}
let endless = () => {
  while(true) {}
}

// 枚举类型
function initByRole(role) {
  if (role === 1 || role === 2) {
    // do sth
  } else if (role === 3 || role === 4) {
    // do sth
  } else {
    // do sth
  }
}

// 数字枚举
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}
// console.log(Role.Reporter, Role.Developer) // 1,2
// console.log(Role) // Object

