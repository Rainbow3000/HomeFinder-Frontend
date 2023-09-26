<template>
     <div id="app">
       <!-- <Login/> -->
       <!-- <Register/> -->
       <!-- <Overlay/> -->
       <navbar></navbar>
       <RouterView/>
     </div>
</template>

<script>

import Navbar from './components/navbar/Navbar.vue';
import Overlay from '@/components/overlay/Overlay.vue'
import Login from './components/login/Login.vue';
import Register from '@/components/register/Register.vue'
export default {  
  name: 'App',
  components: {
    Navbar,
    Overlay,
    Login,
    Register
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
