<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png" />
  <Good :list="list" />
</div>
</template>

<script lang="ts">
// import { Options, Vue } from "vue-class-component";
import {
  List
} from './data'
import {
  defineComponent,
  ref
} from "vue";
import Good from './Good'

export default defineComponent({
  name: "Home",
  components: {
    Good
  },
  setup() {
    const list = List
    return {
      list
    }
  }
});
</script>
