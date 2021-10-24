<template>
  <a-form layout="inline" :model="state.form">
    <a-form-item>
      <a-input v-model="state.form.user" placeholder="Username">
        <template v-slot:prefix>
          <UserOutlined style="color:rgba(0,0,0,.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model="state.form.password" type="password" placeholder="Password">
        <template v-slot:prefix>
          <LockOutlined style="color:rgba(0,0,0,.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>{{ state.form.a }}</a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        :disabled="state.form.user === '' || state.form.password === ''"
        @click="handleSubmit"
      >登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form, Input, Button } from "ant-design-vue";
import { reactive } from "vue";

export default {
  components: {
    UserOutlined,
    LockOutlined,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Button.name]: Button
  },
  setup() {
    const state = reactive({
      form: {
        user: "",
        password: ""
      }
    });

    function handleSubmit() {
      console.log(state.form);
    }

    setTimeout(() => {
      state.form.a = '你好啊'
    }, 5000)

    return {
      state,
      handleSubmit
    };
  }
};
</script>
