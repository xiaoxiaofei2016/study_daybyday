abstract class Animal {
  eat() {
    console.log('eat')
  }
  abstract sleep(): void // 抽象方法
}



class Cat extends Animal {
  constructor(name: string) {
    super()
    this.name = name
  }
  name: string
  run() {}
  sleep() {
    console.log('cat sleep')
  }
}
let cat = new Cat('miaomiao')
cat.eat()


class Tiger extends Animal {
  sleep() {
    console.log('Tiger sleep')
  }
}

let tiger = new Tiger()

let animals: Animal[] = [cat, tiger]
animals.forEach(i => {
  i.sleep()
})



class WorkFlow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}

new WorkFlow().step1().step2()

class Myflow extends WorkFlow {
  next() {
    return this;
  }
}
new Myflow().next().step1().next().step2()