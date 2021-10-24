<template>
  <h1>哈喽</h1>
  <input type="text" v-model="val">
  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{todo.name}}</li>
  </ul>
  <router-view />
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'App',
  setup () {
    let state = reactive({
      todos: [ {name: '1112', done: false}, {name: '222', done: false}],
      val: ''
    })
    return {state}
  }
}
</script>
