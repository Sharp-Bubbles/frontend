<template>
  <div class="min-h-screen min-w-screen bg-secondary-dark text-white">
    <div class="container mx-auto">
      <div class="flex justify-end items-center gap-x-2">
        <div class="text-xl py-8 px-4 sm:px-0">
          <p v-if="!isUsernameEditing">
            Your username: 
            <span class="underline">{{ username }}</span>
          </p>
          <div v-else>
            <input class="rounded text-black pl-2" type="text" :value="username" :username="newUsername" @keydown.enter="save">
          </div>
        </div>
        <div class="text-blue-400 flex items-end">
          <button class="min-h-full min-w-full" @click="edit">
            <svg v-if="!isUsernameEditing" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
            </svg>
            <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="text-2xl sm:pt-96">
        <div class="flex flex-col sm:flex-row gap-x-8 justify-between items-center mx-auto max-w-1/2">
          <div class="w-96 h-96 py-4">
            <button 
              class="hover:border-white duration-300 pointer items-center bg-blue-400 rounded border-2 border-blue-400 min-w-full min-h-full light-shadow"
              @click="createConference"
            >
              <span class="flex items-center justify-center">
                <span class="pr-2">Create new conference</span>
                <svg style="width:34px;height:34px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                </svg>
              </span>
            </button>
          </div>
          <div class="w-96 h-96 py-4">
            <button 
              class="hover:border-white duration-300 pointer bg-blue-400 rounded items-center border-2 border-blue-400 min-w-full min-h-full light-shadow"
            >
              <span class="flex items-center justify-center">
                <span class="pr-2">
                  Join conference by link
                </span>
                <svg style="width:34px;height:34px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      isUsernameEditing: false,
      newUsername: ''
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    createConference() {
      console.log('creating conference');
      this.$router.push({ path: '/conference/123' })
    },
    edit() {
      this.isUsernameEditing = true;
    },
    save() {
      this.isUsernameEditing = false;
    }
  }
}
</script>