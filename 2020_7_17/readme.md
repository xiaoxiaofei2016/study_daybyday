|ES6数据类型：|TypeScript新增数据类型|
|-------    | -------------|
|Boolean|void|
|Number|any|
|String|never|
|Symbol|元祖|
|undefined|枚举|
|null|高级类型|
|Object|----|

## 数据类型
### 原始类型
```typescript
let bool: boolean = true
let num: number = 123
let str: string = 'abc'
// str = 123 // error
```

### 数组
```typescript
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
let arr3: Array<number | string> = [1, 2, '3']
```

### 元祖
```typescript
let tuple: [number, string] = [0, '1']
```

### 函数
```typescript
let add = (x: number, y: number) => x + y
let compute: (x: number, y: number) => number
compute = (a, b) => a + b
```

### 对象
```typescript
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 3
```

### symbol
```typescript
let s1: symbol = Symbol()
let s2 = Symbol()
s1 === s2 // false
```

### undefined, null
```typescript
let un: undefined = undefined
let nu: null = null
num = undefined // 需将strictNullChecks设置为false 或者设置let num: number ｜ undefined ｜ null = 123
num = null
```

### void
```typescript
let noReturn = () => {}
```

### any
```typescript
let x: any = 1
x = ['3']
```

### never
```typescript
let error = () => {
  throw new Error('error')
}
let endless = () => {
  while(true) {}
}
```

## 枚举

### 符串枚举
```typescript
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了'
}
```

### 异构枚举
```typescript
enum Answer {
  N,
  Y = 'Yes'
}
```

### 枚举成员
```typescript
// Role.Reporter = 0
enum Char {
  // const member
  a,
  b = Char.a,
  c = 1 + 3,
  // computed member
  d = Math.random(),
  e = '123'.length,
  f = 4
}
```

### 常量枚举
```typescript
const enum Month {
  Jan,
  Feb,
  Mar,
  Apr = Month.Mar + 1,
  // May = () => 5
}
let month = [Month.Jan, Month.Feb, Month.Mar]
```

### 枚举类型
```typescript
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3
// console.log(e === f)  // false

let e1: E.a = 3
let e2: E.b = 3
let e3: E.a = 3
// console.log(e1 === e2) // false
// console.log(e1 === e3) // true

let g1: G = G.a
let g2: G.a = G.a
```
## 接口
### 对象类型接口
```typescript
interface List {
  readonly id: number;
  name: string;
  // [x: string]: any;
  age?: number;
}
interface Result {
  data: List[]
}
function render(result: Result) {
  result.data.forEach((value) => {
      console.log(value.id, value.name)
      if (value.age) {
          console.log(value.age)
      }
      // value.id++
  })
}
let result = {
  data: [
      {id: 1, name: 'A', sex: 'male'},
      {id: 2, name: 'B', age: 10}
  ]
}
render(result)
// 类型断言一：(推荐使用)
// render({
//   data: [
//       {id: 1, name: 'A', sex: 'male'},
//       {id: 2, name: 'B', age: 10}
//   ]
// } as Result)
// 类型断言二：
// render(<Result>{
//   data: [
//       {id: 1, name: 'A', sex: 'male'},
//       {id: 2, name: 'B', age: 10}
//   ]
// })

interface StringArray {
  [index: number]: string
}
let chars: StringArray = ['a', 'b']

interface Names {
  [x: string]: any;
  // y: number;
  [z: number]: number;
}
```
### 函数类型接口
```typescript
/ let add: (x: number, y: number) => number
// interface Add {
//     (x: number, y: number): number
// }
type Add = (x: number, y: number) => number
let add1: Add = (a: number, b: number) => a + b

interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

// 创建多个实例：
function getLib() {
  let lib = (() => {}) as Lib
  lib.version = '1.0.0'
  lib.doSomething = () => {}
  return lib;
}
let lib1 = getLib()
lib1()
let lib2 = getLib()
lib2.doSomething()
```

## 函数
### 重载
```typescript
function add(...rest: number[]): number;
function add(...rest: string[]): string;
function add(...rest: any[]) {
  let first = rest[0];
  if (typeof first === 'number') {
      return rest.reduce((pre, cur) => pre + cur);
  }
  if (typeof first === 'string') {
      return rest.join('');
  }
}
console.log(add(1, 2)) // 3
console.log(add('a', 'b', 'c')) // abc
```