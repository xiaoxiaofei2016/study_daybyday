// 函数定义
function addfn1(x: number, y: number) {
  return x + y
}

let addfn2: (x: number, y: number) => number

type addfn3 = (x: number, y: number) => number

interface addfn4 {
  (x: number, y: number): number
}

addfn1(1, 2)

function add5(x: number, y?: number) {
  return y ? x + y : x
}
add5(1)

function add6(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q
}
add6(1, undefined, 3)

function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur);
}
add7(1, 2, 3, 4, 5)

function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]) {
  let first = rest[0];
  if (typeof first === 'number') {
      return rest.reduce((pre, cur) => pre + cur);
  }
  if (typeof first === 'string') {
      return rest.join('');
  }
}
console.log(add8(1, 2))
console.log(add8('a', 'b', 'c'))