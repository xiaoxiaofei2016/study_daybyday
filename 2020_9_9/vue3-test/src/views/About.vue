<template>
  <div class="about">
    <h1>This is an about page</h1>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script lang="ts">
import { onMounted, onBeforeMount, nextTick } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'About',
  components: {
    HelloWorld
  },
  setup () {
    onMounted(() => {
      console.log('onMounted', '3')
    })
    onBeforeMount(() => {
      console.log('onBeforeMount', '2')
    })
    nextTick(() => {
      console.log('nextTick', '4')
    })
    console.log('about', '1')
  }
}
</script>
