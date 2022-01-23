<template>
  <div class="bg-blue-400 min-h-screen min-w-screen flex flex-col items-center justify-center">
    <div class="flex flex-col max-w-1/4 shadow-md rounded bg-white text-black py-16 px-16 font-main">
      <label for="username" class="flex flex-col">
        <span class="font-medium pb-8 text-center text-xl">
          Input your username
        </span>
      </label>

      <div class="flex">
        <div class="max-w-3/4">
          <input 
            type="text" 
            id="username" 
            v-model="username"
            class="block pl-2 max-w-full min-h-full box-border rounded border border-black outline-none focus:shadow"
          >
        </div>
        <div class="block pl-2 flex-grow">
          <button 
            @click="setUsername"
            class="min-w-full block rounded border bg-success py-1 min-h-full hover:bg-opacity-80 duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegisterUsername',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    setUsername() {
      this.$store.commit('setUsernameToLocalStorage', this.username);
      this.$store.commit('setUsername', this.username);

      this.$router.push({ name: 'Home' })
    }
  }
}
</script>