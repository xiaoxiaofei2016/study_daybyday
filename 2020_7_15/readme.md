### 强类型语言：不允许改变变量的类型，除非进行强制类型转换
### 弱类型语言：变量可以被赋予不同的数据类型

```js
let x = 1;
let y = true;
x = y // true
let z = 'a';
x = z // 'a'
```

```java
class C {
  public static void main(String[] args) {
    int x = 1;
    boolean y = true;
    // x = y; // Error类型不兼容
    char z = 'a';
    x = z;
    System.out.println(x) // 97 强制类型转换
  }
}
```

> js为弱类型语言

### 静态类型语言：在编译阶段确定所有变量的类型
### 动态类型语言：在执行阶段确定所有变量的类型

```js
class C {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
function add (a, b) {
  return a.x + a.y + b.x + b.y
}
```

```C++
class C {
  public:
    int x;
    int y;
}
int add(C a, C b) {
  return a.x + a.y + b.x + b.y
}
```
> js为动态类型语言

## 静态类型语言与动态类型语言对比

 |静态类型语言|动态类型语言|
 |:-----|:-----|
|对类型极度严格|对类型非常宽松|
|立即发现错误|Bug可能隐藏数月甚至数年|
|运行时性能好|运行时性能差|
|自文档化|可读性差|

> javaScript为动态弱类型语言，那typeScript呢？

### demo

```ts
interface Person {
  firstName: string;
  lastName: string;
}
function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
let user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
```

转化为对应的js代码为：
```js
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
```