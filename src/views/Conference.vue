<template>
<div class="min-h-screen min-w-screen bg-secondary-dark">
  <div 
    class="container mx-auto"
    :class="{'min-h-screen flex items-center': users.length <= 4}"
  >
    <div class="flex flex-wrap justify-between pt-8 flex-grow">
      <Peer 
        class="min-w-1/4 max-w-1/4"

        :isLocalUser="true"
        :user="localUser"
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
  components: {
    Peer
  },
  methods: {

  },
  computed: {
    users() {
      return this.$store.state.peers;
    },
    localUser() {
      return this.$store.state.localUser;
    }
  }
}
</script>