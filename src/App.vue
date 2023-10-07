<template>
     <div id="app">
       <div>
       </div>
       <Login v-if="isLogin"/> 
       <Register v-if="isRegister"/> 
       <CreatePostVue v-if="isShowCreatePost"/>
       <Overlay v-if="isShowOverlay"/>
       <navbar></navbar>
       <RouterView/>
       <toast-message/>
     </div>
</template>

<script>

import Navbar from './components/navbar/Navbar.vue';
import Overlay from '@/components/overlay/Overlay.vue'
import Login from './components/login/Login.vue';
import Register from '@/components/register/Register.vue'
import CreatePostVue from './components/createpost/CreatePost.vue';
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import ToastMessage from './components/toastmessage/ToastMessage.vue';
export default {  
  name: 'App',
  components: {
    Navbar,
    Overlay,
    Login,
    Register,
    CreatePostVue,
    ToastMessage
  },
  setup(props) {
     const store = useStore(); 
     const overlay = computed(()=> store.state.isShowOverlay); 
     watch(()=> overlay.value, (newValue,oldValue)=>{
                console.log('aaa',newValue);
      })
     return {
      isLogin:computed(()=> store.state.link.isLogin),
      isRegister:computed(()=> store.state.link.isRegister),
      isShowCreatePost:computed(()=> store.state.link.isShowCreatePost),
      isShowOverlay:computed(()=>store.state.showOverlay)
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
