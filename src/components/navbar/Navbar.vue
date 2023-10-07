''<template>
    <div class="navbar-container">
        <div class="navbar-left">
            <div class="navbar-logo">
                <h1><router-link class="link" to="/">HOME FINDER</router-link></h1>
            </div>
            <ul class="navbar-link">
                <li>
                    <router-link class="link" to="/dashboard">
                        Quản Lý Tin
                    </router-link>
                </li>
                <li>Tin Tức</li>
                <li>Hướng Dẫn</li>
            </ul>
        </div>

        <div class="navbar-right">
            <div v-if="user !== null" class="navbar-icon">
                <i class="fa-regular fa-user"></i>
                <span style="color: green;"> {{ user.userName }}</span>
            </div>
            <div class="navbar-icon">
                <i class="fa-regular fa-heart"></i>
                <span>Tin Đã Lưu</span>
            </div>
            <div class="navbar-icon">
                <i class="fa-regular fa-bell"></i>
                <span>Thông Báo</span>
            </div>
            <div v-if="user === null" class="navbar-icon">
                <i class="fa-regular fa-user"></i>
                <span @click="onLoginForm">Đăng Nhập</span>
                <span> / </span>
                <span @click="onRegisterForm">Đăng Ký</span>
            </div>

            <div v-if="user !== null" @click="onLogout" class="navbar-icon">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Đăng Xuất</span>
            </div>

            <div  class="navbar-icon">
                <div @click="onShowCreatePost" class="btn-create-post-wraper">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <strong>Đăng Tin</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
import Button from '../button/Button.vue';
import { resetToastMessage } from '@/helper/helper';
export default {
    name:'NavbarComponent',
    components:{
        Button
    },
    setup(){
        const store = useStore(); 
 
        const onLoginForm = ()=>{
            store.commit('loginLink')
            store.commit('showOverlay')
        }      
        
        const onRegisterForm = ()=>{
            store.commit('registerLink')
            store.commit('showOverlay')
        } 

        const onShowCreatePost =()=>{
            const user = JSON.parse(localStorage.getItem('user'));
            if(user === null){
                store.commit('showToastMessage',{
                        isShow:true,
                        message:"Bạn phải đăng nhập để có thể đăng tin !", 
                        type :"error"
                })
                resetToastMessage(store); 
                return; 
            }

            store.commit("showCreatePost")
            store.commit('showOverlay')
        }    

        const onLogout = ()=>{
            store.commit("logout");
            resetToastMessage(store); 
        }
        
        return {
            onLoginForm,
            onRegisterForm,
            onShowCreatePost,
            onLogout,
            user:computed(()=> store.state.user)
        }
    }
}
</script>



<style scoped>


.navbar-logo{
    display: flex;
    align-content: center;
}

.navbar-logo i{
    margin-right: 5px;
}

.navbar-logo h1{
    font-size: 18px;
}


.navbar-container{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: #FFFFFF;
    z-index: 100;
    border-bottom: 0.5px solid rgba(128, 128, 128, 0.164);
}
.btn-create-post-wraper{
    background-color: #009643;
    color: white;
    display: flex;
    border-radius: 4px;
    align-items: center;
    width: 120px;
    justify-content: center;
    height: 40px;
}

.btn-create-post-wraper:hover{
    background-color: green;
}
.navbar-left{
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 50px;
}
.navbar-link{
    height: 100%;
    display: flex;
    margin-left: 50px;
    font-weight: 500;
    width: auto;
}

.navbar-link li{
    margin-left: 20px;
    cursor: pointer;
}

.navbar-link li:hover{
    color: gray;
}

.navbar-right{
    flex: 2;
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: flex-end;
    padding-right: 50px;
}

.navbar-right div{
    margin-left: 20px;
    cursor: pointer;
}


.navbar-icon i{
    margin-right: 5px;
}

.navbar-icon span:hover{
    color: gray;
}

</style>