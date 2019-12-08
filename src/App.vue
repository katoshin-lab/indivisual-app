<template>
  <div id="app">
    <header>
      <template v-if="isAuthenticated">
        <div>
          <router-link 
            to="/"
            class="header-item"
          >掲示板</router-link>
          <span class="header-item" @click="logout">ログアウト</span>
        </div>
      </template>
      <template v-if="!isAuthenticated">
        <router-link
          to="/login"
          class="header-item"
        >ログイン</router-link>
        <router-link
          to="/register"
          class="header-item"
        >サインアップ</router-link>
      </template>
    </header>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-item {
  padding: 10px;
  cursor: pointer;
}
#app {
  height: calc(100vh - 76px);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

// トランジション：fade
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
</style>