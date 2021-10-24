// shims-vue-d.ts是typescript的声明文件，存放ts不能推导出的类型
declare module '*.vue'{
  import type { defineComponent } from 'vue'
  const component: defineComponent
  export default component

  // 另一种写法
  // import { defineComponent } from 'vue'
  // const component: ReturnType<typeof defineComponent>
  // export default component
}

// 声明全局属性类型
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties<T> {
//     $axios: T;
//   }
// }