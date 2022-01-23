<template>
  <div 
    class="px-4"
  >
    <div 
      class="border rounded border-blue-500 min-h-full flex justify-center items-center bg-blue-400"
      :class="{'h-64': !userMedia}"
    >
      <transition name="opacity-change" mode="out-in">
        <video v-if="userMedia.stream" class="min-h-full min-w-full rounded" muted autoplay playsinline :srcObject.prop="userMedia.stream"></video>
        <spring-spinner
          v-else

          :size="36"
        ></spring-spinner>
      </transition>
    </div>
    <div class="flex py-2" :class="isLocalUser ? 'justify-between' : 'justify-center'">
      <div class="text-center text-white">
        <p>
          {{ user.name }}  
        </p>  
      </div>        
      <div v-if="isLocalUser">
        <button @click="toggleMic" class="px-2">
          <svg v-if="user.isMicEnabled" style="width:24px;height:24px;" viewBox="0 0 24 24">
              <path fill="white" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
          </svg>
          <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="white" d="M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z" />
          </svg>
        </button>
        <button @click="toggleCamera" class="pl-2">
          <svg v-if="user.isCameraEnabled" style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="white" d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
          </svg>
          <svg v-else style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="white" d="M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SpringSpinner } from 'epic-spinners';

import MediaResources from '@/utils/MediaResources';

export default {
  name: 'Peer',
  components: {
    SpringSpinner
  },
  props: {
    user: {
      type: Object,
      required: true
    }, 
    isLocalUser: {
      type: Boolean,
    }
  },
  mounted() {
    if (this.isLocalUser) {
      MediaResources.initLocalMedia()
        .then(mediaResources => this.$store.commit('setLocalMediaObject', mediaResources))
        .then(() => console.log(this.userMedia));
    }
  },
  computed: {
    userMedia() {
      return this.$store.state.localMediaObject;
    }
  },
  methods: {
    toggleMic() {
      this.user.isMicEnabled 
        ? this.turnOffMic()
        : this.turnOnMic();
    },
    toggleCamera() {
      this.user.isCameraEnabled 
        ? this.turnOffCamera()
        : this.turnOnCamera();
    },

    turnOnMic() {
      this.user.isMicEnabled = true;
    },
    turnOffMic() {
      this.user.isMicEnabled = false;
    },

    turnOnCamera() {
      this.user.isCameraEnabled = true;
    },
    turnOffCamera() {
      this.user.isCameraEnabled = false;
    }
  }
}
</script>