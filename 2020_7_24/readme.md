## TS类型检查机制

TS类型检查机制：
TypeScript编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。
作用：
辅助开发，提高开发效率

### 类型推断
类型推断：
不需要指定变量的类型（函数的返回值类型），TypeScript可以根据某些规则自动地为其推断出一个类型。

#### 基础类型推断

```typescript
let a // a: any
let b = [1, null] // 当"strictNullChecks": false时, b: number，为true时为： b: (number | null)[]
let c = (x = 1) => x + 1 // c: number
``` 


最佳通用类型推断
上下文类型推断

类型断言

```typescript
interface Foo {
  bar: number
}
let foo = {} as Foo
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法：

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function getName(animal: Cat | Fish) {
  return animal.name;
}
```

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') {
    return true;
  }
  return false;
}
```

上面的例子中，获取 animal.swim 的时候会报错。

此时可以使用类型断言，将 animal 断言成 Fish：

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
```
需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
