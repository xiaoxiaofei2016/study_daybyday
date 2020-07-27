// let a
// let b = [1, null]
// let c = (x = 1) => x + 1

window.onkeydown = (event) => {
  console.log(event)
}

interface Foo {
  bar: number
}

let foo = {} as Foo


interface X {
  a: any;
  b: any;
}
interface Y {
  a: any;
  b: any;
  c: any;
}

let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}
x = y // OK
// y = x // Error

type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}

let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2) // Error

let a = (p1: number, p2: number) => {}
let b = (p1?: number, p2?: number) => {}
let c = (...args: number[]) => {}
a = b // 固定参数兼容可选参数
a = c
b = c // 可选参数不可兼容剩余参数和固定参数 strictFunctionTypes: false时可兼容 
b = a
c = a // 剩余参数可以固定参数和可选参数
c = b

interface Point3D {
  x: number;
  y: number;
  z: number;
}
interface Point2D {
  x: number;
  y: number;
}

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d // 成员个数多的兼容成员个数少的
p2d = p3d // strictFunctionTypes: false时可兼容 

