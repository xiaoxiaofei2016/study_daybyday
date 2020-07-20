我们知道vue的v-model在input中的使用：

```js
<input type="text" v-model="filename" />
<input type="text" :value="filename" @input="filename=$event.target.value"/>
```
其实上下两种写法效果是一样的，也就是说上面的写法是下面写法的语法糖

那么我们可以这样理解：

**在给 input 元素添加 v-model 属性时，默认会把 value 作为元素的属性，把 input 事件作为实时传递 value 的触发事件**

既然是这样，我们不妨将v-model用于父子组件中，用于实现父子组件对某个数据的双向绑定

> parent.vue


```js
// 父组件
<template>
  <div class="parent">
    <child v-model="inputValue"></child>
    {{inputValue}}
  </div>
</template>

<script>
import child from './child.vue'
export default {
  components: {
    child
  },
  data () {
    return {
      inputValue: ''
    }
  }
}
</script>
```

> child.vue


```js
// 子组件
<template>
  <input type="text" :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  }
}
</script>
```

当然，子组件我们也可以这样写：


```js
// 子组件
<template>
  <input type="text" v-model="filename" />
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  computed: {
    filename: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
```

效果如下：


![](https://user-gold-cdn.xitu.io/2020/7/19/17367871c23b276a?w=48&h=34&f=webp&s=32114)

类似的，我们可以得到如下总结：

***给组件添加 v-model 属性时，默认会把value 作为组件的属性，把 input作为给组件绑定事件时的事件名***

有时间我们不想用 value 当做默认的属性名，也不想把 input 当做事件名。能不能自定义呢？尤大大提供了model属性：


```js
<template>
  <input type="text" v-model="filename" />
</template>

<script>
export default {
  props: {
    value2: {
      type: String
    }
  },
  model: {
    prop: 'value2',
    event: 'abc'
  },
  computed: {
    filename: {
      get() {
        return this.value2
      },
      set(val) {
        this.$emit('abc', val)
      }
    }
  }
}
</script>
```
