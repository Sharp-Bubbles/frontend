import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    username: '',
    peers: [
      {
        name: 'yaro',
        uid: '2',
        isCameraEnabled: false,
        isMicEnabled: false
      },
      {
        name: 'serzh',
        uid: '3',
        isCameraEnabled: false,
        isMicEnabled: false
      },
    ],
    localUser: {
      name: 'daniel',
      uid: '1'
    }
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
    }
  },
  actions: {

  },
  getters: {
    usernameFromLocalstorage() {
      return localStorage.getItem('videochat-username');
    }
  }
})

export default store
