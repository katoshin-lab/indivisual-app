<template>
  <div>
    <h3>ログイン</h3>
    <label for="email">Email：</label>
    <input
      id="email"
      type="text"
      v-model="email"
    >
    <br>
    <label for="password">パスワード：</label>
    <input
      id="password"
      type="password"
      v-model="password"
    >
    <br>
    <button @click="login">送信</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      
    }
  }
}
</script>

<style>

</style>
