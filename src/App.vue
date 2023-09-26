<template>
     <div id="app">
       <Login v-if="isLogin"/> 
       <Register v-if="isRegister"/> 
       <Overlay v-if="isLogin || isRegister"/>
       <navbar></navbar>
       <RouterView/>
     </div>
</template>

<script>

import Navbar from './components/navbar/Navbar.vue';
import Overlay from '@/components/overlay/Overlay.vue'
import Login from './components/login/Login.vue';
import Register from '@/components/register/Register.vue'
import { computed } from 'vue';
import { useStore } from 'vuex';
import store from './store/store';
export default {  
  name: 'App',
  components: {
    Navbar,
    Overlay,
    Login,
    Register
  },
  setup(props) {
     const store = useStore(); 
     return {
      isLogin:computed(()=> store.state.isLogin),
      isRegister:computed(()=> store.state.isRegister),
     }
  }
}
</script>

<style scoped>
  @import url('./assets/css/reset.css');

  #app{
    width: 100%;
    height: auto;
    padding-bottom: 50px;
    position: relative;
  }
</style>
