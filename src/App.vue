<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',

  mounted() {
    const username = this.$store.getters.usernameFromLocalstorage;

    if (username) {
      this.$store.commit('setUsername', username);
    }
  }
}
</script>