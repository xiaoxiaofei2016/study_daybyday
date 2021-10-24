<template>
  <div class="about">
    <div class="age">年龄： {{ myAge }}</div>
    <div class="age">最近年龄： {{ myLastAge }}</div>
    <div class="age">姓名： {{ myName }}</div>
    <div class="age" ref="color">地址： {{ state1.address }}</div>
    <ul>
      <li v-for="(item, index) in state.hoppys" :key="index">{{ item }}</li>
    </ul>
    <button @click="addAge">点我</button>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, watchEffect, watch, computed, onMounted } from 'vue'

export default {
  name: 'About',
  setup () {
    const myAge = ref(24) // 响应式数据
    let myName = '狄恩' // 非响应式数据
    const color: any = ref(null)
    const state = reactive({
      hoppys: ['中国象棋', 'typeScript']
    })
    const state1 = reactive({
      address: '江西赣州'
    })
    setTimeout(() => {
      state.hoppys[2] = 'javaScript'
      state1.address = '杭州'
      myAge.value += 1
      myName = '杜发军'
      color.value.style.color = 'red' // ref取值是通过其value属性
    }, 3000)
    const myLastAge = computed(() => {
      return myAge.value - 1
    })
    watchEffect(() => { // 一开始就会调用一次,当watchEffect中使用到的数据发生变化了就会重新执行一次
      console.log(state.hoppys[2], 'watchEffect')
    })
    watch([myAge], newVal => { // 可以同时监听多个值，当其中一项发生变化后则会触发watch
      console.log(newVal, '我变了')
    })
    const methods = {
      addAge () {
        myAge.value += 5
      }
    }
    return {
      myAge,
      myLastAge,
      myName,
      state,
      state1,
      ...methods,
      color
    }
  }
}
</script>
