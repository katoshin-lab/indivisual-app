<template>
  <div id="app">
    <header>
      <router-link 
        to="/"
        class="header-item"
      >掲示板</router-link>
      <router-link
        to="/login"
        class="header-item"
      >ログイン</router-link>
      <router-link
        to="/register"
        class="header-item"
      >登録</router-link>
    </header>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.header-item {
  padding: 10px;
}
#app {
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