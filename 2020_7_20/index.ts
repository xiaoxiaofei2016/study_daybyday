// 函数定义：
function add1(x: number, y: number) {
  return x + y;
}

let add2: (x: number, y: number) => number

type add3 = (x: number, y: number) => number

interface add4 {
  (x: number, y: number): number
}

function add6(x: number, y = 0, z: number, q = 1) {
  console.log(x, y, z, q)
  return x + y + z + q
}

console.log(add6(1, undefined, 3))