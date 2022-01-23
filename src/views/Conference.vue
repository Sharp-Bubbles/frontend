<template>
<div class="min-h-screen min-w-screen bg-secondary-dark">
  <div 
    class="container mx-auto pt-8"
    :class="{'min-h-screen flex items-center': users.length <= 4 && !isCall}"
  >
    <div v-if="isCall" class="px-4 flex">
      <input class="rounded pl-2" type="text" v-model="calleeUsername" @keydown.enter="sendCallInvite" />
      <div class="px-2">
        <button class="text-white border border-blue-400 bg-blue-400 rounded px-8 min-h-full" @click="sendCallInvite">
          Send call invite
        </button>
      </div>
    </div>
    <div class="flex flex-wrap justify-between pt-8 flex-grow">
      <Peer 
        class="min-w-1/4 max-w-1/4"

        :isLocalUser="true"
        :user="{ name:  $store.state.username }"
      />
      <Peer 
        class="min-w-1/4 max-w-1/4"

        v-for="user in users"
        :key="user.uid"
        
        :user="user"
      />
    </div>
  </div>
</div>
</template>
<script>
import Peer from '@/components/Peer.vue';

export default {
  name: 'Conference',
  data() {
    return {
      calleeUsername: ''
    }
  },
  components: {
    Peer
  },
  methods: {
    isCall() {
      return this.$route.name.toLowerCase() === 'call';
    },
    sendCallInvite() {
      this.$store.commit('setCalleeUsername', this.calleeUsername);
      this.calleeUsername = '';
    }
  },
  computed: {
    users() {
      return this.$store.state.peers;
    },
  }
}
</script>