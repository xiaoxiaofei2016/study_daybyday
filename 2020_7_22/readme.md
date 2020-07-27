## 类（class）

> ES6引入了**class**关键字，我们可以像传统的面向对象语言那样去创建一个类了，TS的类覆盖了ES6的类，同时也引入了其他的特性，那么他们有什么不同呢？

定义一个基本类：
```ts
class Dog {
  constructor(name: string) {
    this.name = name
  }
  name: string
  run() {}
}
let dog = new Dog('wn')
```

分别打印出原型prototype和实例dog：


```TS
console.log(Dog.prototype) // Dog { run: [Function], construtor: [Function] }
console.log(dog) // Dog { name: 'wn' }
```

可以看出：

**ES6和TS的类成员的属性都是实例属性，而不是原型属性，类成员的方法都是实例方法**

但是不同的是,在TS中，类实例的属性必须具有初始值或者必须在构造函数中初始化

因此这样也是可以的：

```ts
class Dog {
  constructor() {}
  name: string = 'wn'
  run() {}
}
let dog = new Dog('abc')
```

### 继承
TS类的继承和ES6类的继承一样，采用关键字extends：


```ts
class Husky extends Dog {
  constructor (name, color: string) {
    super(name)
    this.color = color
  }
  color: string
}
```

- 需要注意的是super要有，且super一定要在this之前

### 成员修饰符

TS类的成员修饰符有：

- public
- private
- protected
- readonly
- static

#### public

类的所有属性默认都是public，含义就是对所有人都是可见的，也可以显示声明：

```ts
class Dog {
  constructor() {}
  public name: string = 'wn'
}
```

#### private

私有成员只能在类本身被调用，而不能被类的实例和子类中调用；**给constructor定义为private，则该类既不能被示例化，也不能被继承**：


```ts
class Dog {
  private constructor(name: string) {}
  name: string
  run() {}
}
```

#### protected
protected受保护成员，只能在类和子类中访问，而不能在类的实例中访问

**基类：** constructor定义为proteced，表示这个类只能被继承，不能被实例化

#### readonly
只读，不能被修改，和实例属性一样，一定要初始化

#### static
类的静态成员,只能被类(包括子类)调用，而不能被实例调用

> 除了类的成员可以添加修饰符， constructor的参数也可以添加修饰符，作用是将参数自动变成实例的属性，这样可以省略在类中的定义了:


```ts
class Husky extends Dog {
  constructor (name: string, public color: string) {
    super(name)
    this.color = color
  }
  color: string // 构造函数参数加了public修饰符，这里可以省略了
}
```

## 抽象类
> ES没有引入抽象类的概念，这是TS相对于ES的扩展，所谓抽象类就是只能被继承，而不能被实例化的类

抽象方法：抽象类中不指定方法的具体实现，明确知道子类可以有其他的实现，就没必要在父类中实现

抽象类的好处：
抽离出事物的共性，有利于代码的复用和扩展

抽象类也可以实现多态

多态：
父类定义一个方法不去实现，让继承他的子类去实现，每一个子类有不同的表现，多态属于继承

## 链式调用

```ts
class WorkFlow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}
new WorkFlow().step1().step2()
```

在继承的时候，this也可以表现出多态，指既可以指向父类也可以指向子类,保持了父类和子类接口调用的连贯性

```ts
class Workflow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}
class Myflow extends Workflow {
  next() {
    return this;
  }
}
new Myflow().next().step1().next().step2()
```