<template>
  <div>
    <h3>登録</h3>
    <label for="email">Email：</label>
    <input
      id="email"
      type="email"
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
import axios from '../axios-auth';

export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyAqhBri1FeL8F6MI6MuxahWihnc7h4OfPY',
        {
          email: this.email,
          password: this.password,
          returnSecureToken: true
        }
      )
      .then(response => {
        console.log(response);
      });
      this.email = "";
      this.password = "";
    }
  }
}
</script>

<style>

</style>
