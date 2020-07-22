class Dog {
  constructor() {
    // this.name = name
  }
  name: string
  run() {} // void
  static food: string = 'bones'
}
console.log(Dog.prototype) // {run: f, constructor: f}
// es6和TS的类成员的属性都是实例属性，而不是原型属性，类成员的方法都是实例方法
let dog = new Dog()
console.log(dog) // {name: 'wn}
// 实例的属性必须具有初始值或者必须在构造函数中初始化
console.log(Dog.food)
// console.log(dog.food)

// 继承
// class Husky extends Dog {
//   constructor (name, color: string) {
//     super(name)
//     this.color = color
//   }
//   color: string
// }

// 成员修饰符(TS对es6的扩展)
// public：类的属性默认都是public，含义就是对所有人都是可见的，也可以显示声明
// 私有成员只能在类本身被调用，而不能被类的实例和子类中调用
// 给constructor定义为private，则该类既不能被示例化，也不能被继承
// protected受保护成员，只能在类和子类中访问，而不能在类的实例中访问
// 给constructor定义为proteced，表示这个类只能被继承，不能被实例化，基类
// readonly 只读，不能被修改，和实例属性一样，一定要初始化

//除了类的成员可以添加修饰符， constructor的参数也可以添加修饰符，作用是将参数自动变成实例的属性，这样可以省略在类中的定义了
// class Husky extends Dog {
//   constructor (name: string, public color: string) {
//     super(name)
//     this.color = color
//   }
// }

// static 类的静态成员,只能被类(包括子类)调用，而不能被实例调用

