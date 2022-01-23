import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    username: '',
    calleeUsername: '',
    peers: [],
    localMediaObject: {}
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setUsernameToLocalStorage(state, username) {
      if (localStorage) {
        localStorage.setItem('videochat-username', username);
      }
    },
    changeUsername(state, username) {
      state.username = username;
      this.commit('setUsernameToLocalStorage', username);
    },
    setLocalMediaObject(state, mediaObject) {
      state.localMediaObject = mediaObject;
    },
    setCalleeUsername(state, username) {
      state.calleeUsername = username;
      state.localMediaObject.setRemoteUsername(username);
    }
  },
  actions: {
    async call({ state }) {
      await state.localMediaObject.call();
    }
  },
  getters: {
    usernameFromLocalstorage() {
      return localStorage.getItem('videochat-username');
    }
  }
})

export default store
