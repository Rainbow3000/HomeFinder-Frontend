
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
       link:{
         isLogin:false,
         isRegister:false
       }
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    login(state){
        state.isLogin = !state.isLogin;
    },
    register(state){
        state.isRegister = !state.isRegister;
    }
  },
  actions:{
    incrementMutation({commit}){
        commit("increment")
    }
  }
})


export default store; 